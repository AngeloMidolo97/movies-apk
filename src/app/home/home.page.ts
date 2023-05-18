import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Movie } from '../models/movie';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  movies: Movie[] = [];
  type: string = "";
  id!: string;
  page: number = 1;

  constructor(private apiSrv: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['imdbID']
    this.getData(this.page);
  }

  //DATI INZIALI
  getData(page: number) {
    page = this.page;
    this.apiSrv.getData(page).subscribe(data => {
      //CICLO FOR PER AGGIUNGERE GLI ELEMENTI CARICATI DALL'INFINITE SCROLL ALL'INTERNO DELL'ARRAY
      for (let i = 0; i < data.Search.length; i++) {
        this.movies.push(data.Search[i])
      }
    })
  }

  onSubmit(f:NgForm) {
    //CHECKBOX PER FILTRARE TRA SERIE TV E FILM
    if(f.value.movie) {
      this.type = "movie"
    } else if (f.value.serie) {
      this.type = "series"
    } else if (f.value.movie && f.value.serie){
      this.type = "";
    } else {
      this.type = ""
    }

    //RICHIESTA DATI ALL'API
    this.apiSrv.searchData(f.value.title, this.type).subscribe(data => {

      this.movies = data.Search;

      if(f.value.sort === "az") {

        //ORDINAMENTO ALFABETICO
        this.movies.sort((a, b) => {
          if(a.Title < b.Title) {
            return -1;
          } else if (a.Title > b.Title) {
            return 1
          } else {
            return 0
          }
        });
      }
      //ORDINAMENTO PER ANNO
       else if (f.value.sort === "year") {

        this.movies.sort((a, b) => {
          if(a.Year > b.Year) {
            return -1;
          } else if (a.Year < b.Year) {
            return 1
          } else {
            return 0
          }
        });
      }
    })
  }

  //INFINITE SCROLL CHE CARICA UNA NUOVA PAGINA DALL'API
  onIonInfinite(ev: Event) {

    this.page++

    this.getData(this.page)

    console.log(this.page)
    console.log(this.movies);


    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
