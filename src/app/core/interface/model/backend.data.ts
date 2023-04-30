export interface BackendData {
  id?: number,
  original_title?: string
  original_language?: string,
  title?: string
  release_date?: string | Date
  overview?: string,
  poster_path?: string,
  imdb_id?: string
  genres?: Genres[]
}

export interface Genres {
  id?: number,
  cast: castValues[]
}

export interface castValues{
  character: string
  name: string
}
