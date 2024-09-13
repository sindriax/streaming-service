import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MovieComponent } from "./movie/movie.component";
import { MovieService } from './shared/services/movie.service';
import { Movies } from './shared/interfaces/movies';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HomeComponent, MovieComponent]
})
export class AppComponent implements OnInit{
  title = 'movies';
  movies!: Movies[];

  moviesService = inject(MovieService);

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(result => this.movies = result )
  }
  
}
