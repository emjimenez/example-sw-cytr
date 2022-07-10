
export interface Character {
  name: string
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
