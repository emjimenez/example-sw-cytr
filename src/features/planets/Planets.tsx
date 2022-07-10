import React from 'react';
import { useGetAllPlanetsQuery } from './../../services/sw'

export function Planets() {
  const { data, error, isLoading } = useGetAllPlanetsQuery()
  return (
    <div>
      <h1 className="text-3xl mb-6">Planets</h1>
      {isLoading && <p>Loading</p>}
      {error && <p>Something went wrong</p>}
      {data && data.map(p => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  );
}
