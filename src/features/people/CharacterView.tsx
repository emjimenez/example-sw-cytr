import React from 'react';
import { useParams } from "react-router-dom"
import { usePeople } from './peopleSlice';

export function CharacterView() {
  const { id } = useParams()
  const { data } = usePeople()
  const pos = Number(id)
  if (data && id && pos < data.length ) {
    const character = data[pos]
    return (
      <div>
        <h1 className="text-3xl mb-6">{character.name}</h1>
        <p>{character.birth_year}</p>
        <p>{character.gender}</p>
      </div>
    )
  }
  return (<div />)
}
