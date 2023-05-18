import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response';
import { Details } from '../models/details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "https://www.omdbapi.com/?apikey=5bc01210";

  constructor(private http: HttpClient) { }

  getData(page: number) {
    return this.http.get<Response>(this.url + "&page=" + page + "&s=all");
  }

  searchData(value: string, type: string) {
    return this.http.get<Response>(this.url + "&s=" + value + "&type=" + type);
  }

  getDataFromId(id: string) {
    return this.http.get<Details>(this.url + "&i=" + id);
  }
}
