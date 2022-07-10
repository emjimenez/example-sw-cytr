import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { ListResponse, Character, Planet, StarShip } from './types'

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
            const data = chunk.data as ListResponse<Character>
            people.push(...data.results)
            pending = data.next != null
          }
        }
        return { data: people }
      },
    }),
    getAllPlanets: builder.query<Planet[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const planets: Planet[] = [];
        let pending = true;
        for (let page = 1; pending; page += 1) {
          const chunk = await fetchWithBQ(`planets/?page=${page}`)
          if (chunk.error) {
            return { error: chunk.error as FetchBaseQueryError }
          }
          if (chunk.data) {
            const data = chunk.data as ListResponse<Planet>
            planets.push(...data.results)
            pending = data.next != null
          }
        }
        return { data: planets }
      },
    }),
    getAllStarShips: builder.query<StarShip[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const starships: StarShip[] = [];
        let pending = true;
        for (let page = 1; pending; page += 1) {
          const chunk = await fetchWithBQ(`starships/?page=${page}`)
          if (chunk.error) {
            return { error: chunk.error as FetchBaseQueryError }
          }
          if (chunk.data) {
            const data = chunk.data as ListResponse<StarShip>
            starships.push(...data.results)
            pending = data.next != null
          }
        }
        return { data: starships }
      },
    }),
  }),
})

export const { useGetAllPeopleQuery, useGetAllPlanetsQuery, useGetAllStarShipsQuery } = swApi
