
export interface Character {
  name: string
  birth_year: string
  eye_color: string
  gender: string
  hair_color: string
  height: string
  mass: string
  skin_color: string
  homeworld: string
  films: string[]
  species: string[]
  starships: string[]
  vehicles: string[]
  url: string
  created: Date
  edited: Date
}

export interface Planet {
  name: string
}

export interface StarShip {
  name: string
}

export interface ListResponse<T> {
  count: number
  next: string
  previous?: string
  results: T[]
}
