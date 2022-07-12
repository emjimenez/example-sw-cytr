import React from 'react';
import { useParams } from "react-router-dom"
import { useGetPlanetQuery } from '../../services/sw';
import { BioFilmEntry } from '../films/BioFilmEntry';
import { FilmTitle } from '../films/FilmTitle';
import { CharacterLink } from '../people/CharacterLink';

export function PlanetView() {
  const { id } = useParams()
  const url = `https://swapi.dev/api/planets/${id}`
  const { data, isLoading, error } = useGetPlanetQuery(url)
  if (error) {
    return (
      <span>Could not load resource</span>
    )
  }
  if (isLoading || !data) {
    return (
      <progress className="progress w-56"></progress>
    )
  }
  return (
    <div>
      <h1 className="text-3xl text-center mb-6">{data.name}</h1>
      <div className="flex flex-row">
        <div className="relative m-3 w-1/4 bg-base-200">
          <div className="absolute inset-0 h-full m-auto text-center text-9xl">
          🪐
          </div>
        </div>
        <div className="m-3 w-3/4">
          <p>Climate: {data.climate}</p>
          <p>Terrain: {data.terrain}</p>
          <p>Diameter: {data.diameter}</p>
          <p>Gravity: {data.gravity}</p>
          <p>Population: {data.population}</p>
          <p>Rotation period: {data.rotation_period}</p>
          <p>Orbital period: {data.orbital_period}</p>
          <p>Surface water: {data.surface_water}</p>
          <p>Films:</p>
          <ul className="ml-4">
           {data.films.map((film) => <li key={film}><FilmTitle url={film} /> </li>)}
          </ul>
          <p>Residents:</p>
          <ul className="ml-4">
           {data.residents.map((film) => <li key={film}><CharacterLink url={film} /> </li>)}
          </ul>
          <p>Bio:</p>
          <ul className="ml-4">
           {data.films.map((film) => <li key={film}><BioFilmEntry url={film} /> </li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
