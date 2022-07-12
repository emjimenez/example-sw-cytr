import React from 'react';
import { useGetPlanetQuery } from '../../services/sw'

interface Props {
  url: string
}

export function Species({ url }: Props) {
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
  return (
    <span>{data.name}</span>
  )
}
