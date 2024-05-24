import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { Observable, forkJoin, map } from 'rxjs';
import { IUser } from '../../shared/models/user.interface';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
  user!: IUser;
  authService = inject(AuthService);
  movieService = inject(MovieService);
  name = "";
  userProfileImg = "";
  email = "";
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  ngOnInit(): void {
    this.name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
    this.userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
    this.email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
    this.user = this.authService.userData!;

    this.movieService.getMovies().subscribe(res => {
      this.movies = res.results;
      this.bannerDetail$ = this.movieService.getBannerDetail(res.results[1].id);
      this.bannerVideo$ = this.movieService.getBannerVideo(res.results[1].id);
    })
    this.movieService.getTvShows().subscribe(res => {
      this.tvShows = res.results;
    })
    this.movieService.getNowPlayingMovies().subscribe(res => {
      this.nowPlayingMovies = res.results;
    })
    this.movieService.getRatedMovies().subscribe(res => {
      this.ratedMovies = res.results;
    })
    this.movieService.getUpcomingMovies().subscribe(res => {
      this.upcomingMovies = res.results;
    })
    this.movieService.getTopRated().subscribe(res => {
      this.topRatedMovies = res.results;
    })
    this.movieService.getPopularMovies().subscribe(res => {
      this.popularMovies = res.results;
    })
  }
  signOut() {
    sessionStorage.removeItem("loggedInUser");
    this.authService.signOut();
  }

}
