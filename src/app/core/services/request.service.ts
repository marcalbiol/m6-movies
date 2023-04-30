import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {ViewEntity} from "../interface/entity/viewEntity";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BackendData, Genres} from "../interface/model/backend.data";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  apiUriTMBD = 'https://api.themoviedb.org/3/search/movie'
  apiKey = '5cf127cb9f5262e1a6943e88edfd79ef'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2YxMjdjYjlmNTI2MmUxYTY5NDNlODhlZGZkNzllZiIsInN1YiI6IjY0NDk0MDNmMDVhNTMzMDU2NjFiNzI1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y1WZaLrSNqEHf6Lda-6v8_IYhk2aAGcgEqIWoDiiXi4`
  })

  constructor(private http: HttpClient) {
  }

  getMovies(searchInput: string): Observable<ViewEntity[]> {
    return this.http.get<any>(`${this.apiUriTMBD}?api_key=${this.apiKey}&query=${searchInput}&page=1`).pipe(map((res) => this.mapData(res.results)),)
  }

  getOneMovie(movie: string | null): Observable<ViewEntity[]> {
    return this.http.get<any>(`${this.apiUriTMBD}?api_key=${this.apiKey}&query=${movie}`).pipe(map(res => this.mapData(res.results)))
  }

  findMovieInIMDB(id: number | undefined): Observable<number> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=en-US`).pipe(map((res) => res.imdb_id))
  }

  getCreditsMovie(id: number | undefined): Observable<any> {
    return this.http.get<Genres>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`).pipe(map((x) => x.cast), map((x) => x.map((i) => i.character.replace('/', 'as').replace(',', '.')).slice(0, 3)))
  }


  mapData(data: BackendData[]): ViewEntity[] {
    return data.map(item => {
      const viewItem: ViewEntity = {
        id: item.id,
        title: item.title,
        overview: item.overview,
        original_language: item.original_language,
        poster_path: item.poster_path,
        original_title: item.original_title,
        imdb_id: item.imdb_id,
        release_date: item.release_date,
        genres: item.genres
      };
      return viewItem;
    });
  }
}
