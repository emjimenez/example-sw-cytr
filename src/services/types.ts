
export interface Character {
  name: string
}

export interface PeopleList {
  count: number
  next: string
  previous?: string
  results: Character[]
}
