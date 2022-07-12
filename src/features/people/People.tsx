import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePeople, toggleFav, selectFavourites, selectCount, selectTotal } from './peopleSlice'
import { Card } from '../cards/Card'
import { Character } from '../../services/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface Props {
  onlyFavorites?: boolean
}

export function People({ onlyFavorites }: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, isLoading, error } = usePeople()
  const favourites = useAppSelector(selectFavourites)
  const count = useAppSelector(selectCount)
  const total = useAppSelector(selectTotal)
  const [filter, setFilter] = useState('')

  const onClick = (uri: string) => () => {
    const url = uri.replace('https://swapi.dev/api', '')
    navigate(url);
  }

  const onToggleFav = (uri: string) => () => {
    dispatch(toggleFav(uri))
  }

  const handleFilter = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value)
  }

  const regex = new RegExp(filter, 'i')
  let cards = data.filter((c: Character) => regex.test(c.name))
  if (onlyFavorites) {
    cards = cards.filter((c: Character) => favourites.indexOf(c.url) >= 0)
  }

  return (
    <div className='relative w-full'>
        <h1 className='text-3xl mb-3'>Characters</h1>
        {isLoading && <progress className="progress w-56" value={count} max={total}></progress>}
        {error && <p>Something went wrong</p>}
        <div className='sticky top-0 w-full grid z-10 bg-base-100 my-3 flex-col h-24 pb-3'>
          <div className='w-full flex justify-between items-center py-2'>
            <input
              className='w-full input input-bordered'
              type='text'
              placeholder='search'
              value={filter}
              onChange={handleFilter}
            />
          </div>
          <div className='text-right mr-2 text-base-content self-end'>
              {`${cards.length} characters`}
          </div>
        </div>
        <div className='mt-3 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
        {cards && cards.map((p) => (
          <li
            key={p.name}
            className='col-span-1 flex flex-col shadow divide-y divide-primary rounded-xl'
        >
            <Card
              name={p.name}
              image='​👽'
              onClick={onClick(p.url)}
              onToggleFav={onToggleFav(p.url)}
              isFavourite={favourites.indexOf(p.url) >= 0}
            />
          </li>
        ))}
        </div>
    </div>
  )
}
