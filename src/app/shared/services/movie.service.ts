import { Injectable, inject } from '@angular/core';
import { Movies } from '../interfaces/movies';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  http=inject(HttpClient)
  movie!: Observable<Movies[]>

  getMovies(){
    return this.http.get<Movies[]>("http://localhost:3000/movies")
  }

  getMovieById(id:number ):any{
    return this.http.get<Movies>(`http://localhost:3000/movies/${id}`);
  }


}
