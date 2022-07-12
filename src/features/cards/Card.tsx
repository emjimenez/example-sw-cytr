
import React from 'react'

interface Props {
  name: string
  image: string
  onClick?: () => void
  onToggleFav?: () => void
  isFavourite?: boolean
}

export function Card({ name, image, onClick, onToggleFav, isFavourite }: Props) {
  const fill = isFavourite ? 'red' : 'none';

  const handleFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (onToggleFav) {
      onToggleFav();
    }
  }


  return (
    <div
      className="hover:scale-102 hover:shadow-lg text-center block bg-base-200 transform duration-200 rounded-xl cursor-pointer"
      onClick={onClick}
      >
      <div className='h-40 bg-base-300 relative overflow-hidden rounded-t-xl'>
        <div className='absolute inset-0 h-full m-auto text-9xl'>
          {image}
        </div>
        <div className='text-right mr-2 mt-2 text-base-content self-end'>
          {onToggleFav && (
            <div className='tooltip tooltip-bottom' data-tip='Favourite'>
              <button className="btn btn-circle" onClick={handleFav}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6" fill={fill} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <h2 className="text-1xl m-3">
        {name}
      </h2>
    </div>
  )
}