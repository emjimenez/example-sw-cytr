import React from 'react';
import { useGetAllStarShipsQuery } from './../../services/sw'

export function Starships() {
  const { data, error, isLoading } = useGetAllStarShipsQuery()
  return (
    <div>
      <h1 className="text-3xl mb-6">Star ships</h1>
      {isLoading && <p>Loading</p>}
      {error && <p>Something went wrong</p>}
      {data && data.map(p => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  );
}
