import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { PeopleList, Character } from './types'

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<Character[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const people: Character[] = [];
        let pending = true;
        for (let page = 1; pending; page += 1) {
          const chunk = await fetchWithBQ(`people/?page=${page}`)
          if (chunk.error) {
            return { error: chunk.error as FetchBaseQueryError }
          }
          if (chunk.data) {
            const data = chunk.data as PeopleList
            people.push(...data.results)
            pending = data.next != null
          }
        }
        return { data: people }
      },
    }),
  }),
})

export const { useGetAllPeopleQuery } = swApi
