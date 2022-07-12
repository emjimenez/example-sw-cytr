import React from 'react';
import { Link } from 'react-router-dom'
import { useGetStarShipQuery } from './../../services/sw'

interface Props {
  url: string
}

export function StarShipLink({ url }: Props) {
  const { data, error, isLoading } = useGetStarShipQuery(url)
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
