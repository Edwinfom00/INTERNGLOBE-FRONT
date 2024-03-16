import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { range } from 'rxjs';

@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css'],
})
export class CategoryaddComponent implements OnInit {
  ngOnInit(): void {
    this.GetCategory();
  }
  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }
  numbers: number[] = [];

  constructor(private httpclient: HttpClient) {
    range(0, 101).subscribe((value) => {
      this.numbers.push(value); // Stocke chaque valeur émise dans le tableau
    });
  }

  Formdata = {
    name: '',
    status: 200,
  };
  AddCategory() {
    this.httpclient
      .post('http://localhost:8000/api/category/store', this.Formdata, {
        headers: this.getHeaders(),
      })
      .subscribe((res: any) => {
        console.log(res);
        this.Formdata.name = '';
      });
  }

  Data: any[] = [];
  GetCategory() {
    this.httpclient
      .get('http://localhost:8000/api/category', {
        headers: this.getHeaders(),
      })
      .subscribe((res: any) => {
        console.log(res);
        this.Data = res;
      });
  }
}
