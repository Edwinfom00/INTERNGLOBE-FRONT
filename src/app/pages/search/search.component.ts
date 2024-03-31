import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data: any;
  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }
  ngOnInit(): void {}

  constructor(
    private dataservice: DataService,
    private http: HttpClient,
    private route: Router
  ) {}

  getInternsSearch(name: any) {
    const keyword = name.target.value;

    const search = this.dataservice
      .getInternShipName(keyword)
      .then((response) => {
        this.data = response;
        console.log(this.data);
      });
  }
  formAdd = {
    id: '',
  };

  AddToFavorite(IntenrId: number) {
    this.http
      .post(
        `http://localhost:8000/api/interns/favorite/${IntenrId}`,
        this.formAdd,
        {
          headers: this.getHeaders(),
        }
      )
      .subscribe((res) => {
        console.log(res);
        alert('Added Succefully');
      });
  }
  GetDetailOffer(IntenrId: number) {
    this.http
      .get(`http://localhost:8000/api/interns/${IntenrId}`)
      .subscribe((res: any) => {
        this.route.navigate(['/intershipdetails', IntenrId]);
      });
  }
}
