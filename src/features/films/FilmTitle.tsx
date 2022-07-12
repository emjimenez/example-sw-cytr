import React from 'react';
import { useGetFilmQuery } from './../../services/sw'

interface Props {
  url: string
}

export function FilmTitle({ url }: Props) {
  const { data, error, isLoading } = useGetFilmQuery(url)
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
    <span><em>"{data.title}"</em></span>
  )
}
