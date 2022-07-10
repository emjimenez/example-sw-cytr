
import React from 'react'
import type { Character } from '../../services/types'

interface Props {
  character: Character
}

export function CharacterCard({ character }: Props) {
  return (
    <div>
      <h1 className="text-3xl mb-6">{character.name}</h1>
      <p>{character.birth_year}</p>
      <p>{character.gender}</p>
    </div>
  )
}