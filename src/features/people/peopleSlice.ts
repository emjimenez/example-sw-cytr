import { useEffect } from 'react'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { swApi } from '../../services/sw';
import type { ListResponse, Character } from '../../services/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export interface PeopleState {
  list: Character[];
  favourites: string[];
  status: 'idle' | 'loading' | 'failed';
  total: number;
  page: number;
}

const initialState: PeopleState = {
  list: [],
  favourites: [],
  status: 'idle',
  total: 0,
  page: 0,
};

interface FetchPeopleResult {
  data: ListResponse<Character>
  page: number
}

export const selectPage = (state: RootState) => state.people.page;
export const selectTotal = (state: RootState) => state.people.total;
export const selectCount = (state: RootState) => state.people.list.length;
export const selectPeople = (state: RootState) => state.people.list;
export const selectStatus = (state: RootState) => state.people.status;
export const selectIsLoading = (state: RootState) => state.people.status === 'loading';
export const selectError = (state: RootState) => state.people.status === 'failed';
export const selectFavourites = (state: RootState) => state.people.favourites;

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    loading: (state) => {
      state.status = 'loading'
    },
    idle: (state) => {
      state.status = 'idle'
    },
    error: (state) => {
      state.status = 'failed'
    },
    add: (state, action: PayloadAction<FetchPeopleResult>) => {
      if (action.payload.page > state.page) {
        state.page = action.payload.page;
        state.list.push(...action.payload.data.results)
        state.total = action.payload.data.count;
      }
    },
    toggleFav: (state, action: PayloadAction<string>) => {
       const index = state.favourites.indexOf(action.payload)
       if (index >= 0) {
         state.favourites.splice(index, 1)
       } else {
         state.favourites.push(action.payload)
       }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeoplePage.pending, (state) => {
        // console.log('thunk pending')
      })
      .addCase(fetchPeoplePage.fulfilled, (state, action) => {
        // console.log('thunk fullfiled')
      })
      .addCase(fetchPeoplePage.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const fetchPeoplePage = createAsyncThunk<boolean, void, { state: RootState } >(
  'people/fetch',
  async (none, { getState, dispatch }) => {
    const state0 = getState();
    const status = selectStatus(state0)
    const count0 = selectCount(state0)
    const total0 = selectTotal(state0)
    const page = selectPage(state0);
    if (status === 'loading' || (total0 > 0 && count0 >= total0)) {
      // avoid innecesary fetch
      return false;
    }
    dispatch(peopleSlice.actions.loading())
    const result = dispatch(swApi.endpoints.getPeoplePage.initiate(page + 1))
    result.unsubscribe()
    const response = await result
    if (!response.data) {
      dispatch(peopleSlice.actions.error())
      return false;
    }
    dispatch(peopleSlice.actions.add({ data: response.data, page: page + 1}))
    dispatch(peopleSlice.actions.idle())
    const state = getState();
    const count = selectCount(state)
    const total = selectTotal(state)
    if (count < total) {
      dispatch(fetchPeoplePage())
    }
    return true
  }
);

export const { toggleFav } = peopleSlice.actions;

export const usePeople = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectPeople)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)

  useEffect(() => {
    dispatch(fetchPeoplePage()) 
  }, [dispatch])

  return { data, isLoading, error }
}

export default peopleSlice.reducer;
