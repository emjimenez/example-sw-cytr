import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { ListResponse, Character, Planet, StarShip, Film, Species, Vehicle } from './types'

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeoplePage: builder.query<ListResponse<Character>, number>({
      query: (page) => `people/?page=${page}`,
    }),
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
    getPlanet: builder.query<Planet, string>({
      query: (uri) => uri.replace('https://swapi.dev/api/', '')
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
    getStarShip: builder.query<StarShip, string>({
      query: (uri) => uri.replace('https://swapi.dev/api/', '')
    }),
    getFilm: builder.query<Film, string>({
      query: (uri) => uri.replace('https://swapi.dev/api/', '')
    }),
    getVechicle: builder.query<Vehicle, string>({
      query: (uri) => uri.replace('https://swapi.dev/api/', '')
    }),
    getSpecies: builder.query<Species, string>({
      query: (uri) => uri.replace('https://swapi.dev/api/', '')
    }),
    getCharacter: builder.query<Character, string>({
      query: (uri) => uri.replace('https://swapi.dev/api/', '')
    }),
  }),
})

export const {
  useGetAllPeopleQuery,
  useGetPeoplePageQuery,
  useGetAllPlanetsQuery,
  useGetAllStarShipsQuery,
  useGetPlanetQuery,
  useGetFilmQuery,
  useGetVechicleQuery,
  useGetSpeciesQuery,
  useGetStarShipQuery,
  useGetCharacterQuery,
} = swApi
