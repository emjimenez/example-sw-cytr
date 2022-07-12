
export interface ListResponse<T> {
  count: number
  next: string
  previous?: string
  results: T[]
}

export interface Character {
  url: string
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
  created: Date
  edited: Date
}

export interface Planet {
  url: string
  name: string
  climate: string
  terrain: string
  diameter: number
  gravity: number
  orbital_period: number
  rotation_period: number
  surface_water: number
  population: number
  films: string[]
  residents: string[]
}

export interface StarShip {
  url: string
  name: string
  model: string
  starship_class: string
  manufacturer: string
  cost_in_credits: string
  length: string
  crew: string
  passengers: string
  hyperdrive_rating: string
  MGLT: string
  cargo_capacity: string
  consumables: string
  films: string[]
  pilots: string[]
}

export interface Film {
  url: string
  title: string
  release_date: string;
  director: string;
}

export interface Species {
  url: string
  name: string
}

export interface Vehicle {
  url: string
  name: string
}
