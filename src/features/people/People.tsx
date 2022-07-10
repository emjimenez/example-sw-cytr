import React from 'react'
import { Link } from "react-router-dom"
import { usePeople } from './peopleSlice'

export function People() {
  const { data, isLoading, error } = usePeople()

  return (
    <div className='flex flex-row'>
      <div className='basis-1/4'>
        <h2 className="text-3xl mb-6">Characters</h2>
        {isLoading && <p>Loading</p>}
        {error && <p>Something went wrong</p>}
        {data && data.map((p, ix) => (
          <p key={p.name}><Link to={`/people/${ix}`}>{p.name}</Link></p>
        ))}
      </div>
    </div>
  )
}
