import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Details } from '../models/details';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{

  id!: string;
  details!: Details;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['imdbID'];
    this.getData();
  }

  constructor(private apiSrv: ApiService, private route: ActivatedRoute) {}


  getData() {
    this.apiSrv.getDataFromId(this.id).subscribe(data => {
      this.details = data;
    })
  }
}
