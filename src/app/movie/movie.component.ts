import { Component, Input, inject } from '@angular/core';
import { Movies } from '../shared/interfaces/movies';
import { RouterLink } from '@angular/router';
import { MovieService } from '../shared/services/movie.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  @Input() id!: string;
  movies!:Movies;
  movieService = inject(MovieService);
  movieDetail!:Observable<Movies>
  
  ngOnInit(): void {
    let id = parseInt(this.id);

    this.movieDetail = this.movieService.getMovieById(id)
    this.movieDetail.subscribe((response:Movies)=>{
      this.movies=response;
    })
  }
}
