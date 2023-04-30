
export interface ViewEntity {
  id?: number,
  original_title?: string
  original_language?: string,
  title?: string
  release_date?: string | Date
  overview?: string,
  poster_path?: string
  imdb_id?: string
  genres?: GenresEntity[]
}

export interface GenresEntity {
  id?: number,
  name?: string
}
