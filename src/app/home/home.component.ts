import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Movies } from '../shared/interfaces/movies';
import { MovieComponent } from "../movie/movie.component";
import { Observable } from 'rxjs';
import { MovieService } from '../shared/services/movie.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MovieComponent, RouterLink, AsyncPipe]
})
export class HomeComponent{
  public authService = inject(AuthService);

    
    movies!: Observable<Movies[]>;
    @ViewChild('sliderSection') sliderSection!: ElementRef;

    @Input('id') id!: string;
    // movie!: Movies;

    constructor(private movieService:MovieService){}


    ngOnInit(): void {
      console.log(this.movies)
      this.movies = this.movieService.getMovies()
      console.log(this.movies)
      this.updateArrowVisibility();
    }

    scrollLeft(event: Event): void {
      event.preventDefault();
      const wrapper = document.querySelector('.wrapper');
      if (wrapper) {
        wrapper.scrollBy({
          left: -window.innerWidth,
          behavior: 'smooth'
        });
        this.updateArrowVisibility();
      }
    }
  
    scrollRight(event: Event): void {
      event.preventDefault();
      const wrapper = document.querySelector('.wrapper');
      if (wrapper) {
        wrapper.scrollBy({
          left: window.innerWidth,
          behavior: 'smooth'
        });
        this.updateArrowVisibility();
      }
    }
  
    @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.updateArrowVisibility();
  }

  private updateArrowVisibility(): void {
    const wrapper = document.querySelector('.wrapper');
    const leftArrow = document.querySelector('.leftArrow') as HTMLElement;
    const rightArrow = document.querySelector('.rightArrow') as HTMLElement;

    if (wrapper) {
      const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;

      if (wrapper.scrollLeft === 0) {
        leftArrow.style.display = 'none';
      } else {
        leftArrow.style.display = 'block';
      }

      if (wrapper.scrollLeft >= maxScrollLeft) {
        rightArrow.style.display = 'none';
      } else {
        rightArrow.style.display = 'block';
      }
    }
  }

  
  onLogout() {
    this.authService.logout();
  }

}
