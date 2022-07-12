import React from 'react';
import { useGetVechicleQuery } from './../../services/sw'

interface Props {
  url: string
}

export function Vehicle({ url }: Props) {
  const { data, error, isLoading } = useGetVechicleQuery(url)
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
