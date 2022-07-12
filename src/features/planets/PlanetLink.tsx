import React from 'react';
import { Link } from 'react-router-dom'
import { useGetPlanetQuery } from './../../services/sw'

interface Props {
  url: string
}

export function PlanetLink({ url }: Props) {
  const { data, error, isLoading } = useGetPlanetQuery(url)
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
  const uri = data.url.replace('https://swapi.dev/api', '')
  return (
    <Link className="link" to={uri}>{data.name}</Link>
  )
}
