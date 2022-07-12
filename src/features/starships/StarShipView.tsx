import React from 'react';
import { useParams } from "react-router-dom"
import { useGetStarShipQuery } from '../../services/sw';
import { BioFilmEntry } from '../films/BioFilmEntry';
import { FilmTitle } from '../films/FilmTitle';
import { CharacterLink } from '../people/CharacterLink';

export function StarShipView() {
  const { id } = useParams()
  const url = `https://swapi.dev/api/starships/${id}`
  const { data, isLoading, error } = useGetStarShipQuery(url)
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
          🚀​
          </div>
        </div>
        <div className="m-3 w-3/4">
          <p>Model {data.model}</p>
          <p>Star ship class: {data.starship_class}</p>
          <p>Manufacturer: {data.manufacturer}</p>
          <p>Cost in credits: {data.cost_in_credits}</p>
          <p>Length: {data.length}</p>
          <p>Crew: {data.crew}</p>
          <p>Passengers: {data.passengers}</p>
          <p>Hyperdrive rating: {data.hyperdrive_rating}</p>
          <p>MGLT: {data.MGLT}</p>
          <p>Cargo capacity: {data.cargo_capacity}</p>
          <p>Consumables: {data.consumables}</p>
          <p>Films:</p>
          <ul className="ml-4">
           {data.films.map((film) => <li key={film}><FilmTitle url={film} /> </li>)}
          </ul>
          <p>Pilots:</p>
          <ul className="ml-4">
           {data.pilots.map((film) => <li key={film}><CharacterLink url={film} /> </li>)}
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
