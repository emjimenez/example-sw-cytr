import React from 'react';
import { useParams } from "react-router-dom"
import { BioFilmEntry } from '../films/BioFilmEntry';
import { FilmTitle } from '../films/FilmTitle';
import { PlanetLink } from '../planets/PlanetLink';
import { Species } from '../species/Species';
import { StarShipLink } from '../starships/StarShipLink';
import { Vehicle } from '../vehicles/Vehicle';
import { usePeople } from './peopleSlice';

export function CharacterView() {
  const { id } = useParams()
  const { data } = usePeople()
  const pos = Number(id) - 1
  if (data && id && pos >= 0 && pos < data.length ) {
    const character = data[pos]
    return (
      <div>
        <h1 className="text-3xl text-center mb-6">{character.name}</h1>
        <div className="flex flex-row">
          <div className="relative m-3 w-1/4 bg-base-200">
            <div className="absolute inset-0 h-full m-auto text-center text-9xl">
            ​👽
            </div>
          </div>
          <div className="m-3 w-3/4">
            <p>Birth year: {character.birth_year}</p>
            <p>Gender: {character.gender}</p>
            <p>Eye color: {character.eye_color}</p>
            <p>Hair color: {character.hair_color}</p>
            <p>Skin color: {character.skin_color}</p>
            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <p>Homeworld: <PlanetLink url={character.homeworld} /></p>
            <p>Films:</p>
            <ul className="ml-4">
             {character.films.map((film) => <li key={film}><FilmTitle url={film} /> </li>)}
            </ul>
            <p>Species:</p>
            <ul className="ml-4">
             {character.species.map((species) => <li key={species}><Species url={species} /> </li>)}
            </ul>
            <p>Star Ships:</p>
            <ul className="ml-4">
             {character.starships.map((ship) => <li key={ship}><StarShipLink url={ship} /> </li>)}
            </ul>
            <p>Vehicles:</p>
            <ul className="ml-4">
             {character.vehicles.map((ship) => <li key={ship}><Vehicle url={ship} /> </li>)}
            </ul>
            <p>Bio:</p>
            <ul className="ml-4">
             {character.films.map((film) => <li key={film}><BioFilmEntry url={film} /> </li>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  return (<div />)
}
