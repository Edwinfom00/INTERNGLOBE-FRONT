import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }
  ngOnInit(): void {
    this.GetCategory();
  }

  range = Array.from({ length: 13 }, (x, i) => i);
  FormData = {
    title: '',
    category_id: '',
    type: '',
    position: '',
    roles: '',
    address: '',
    last_date: '',
    start_date: '',
    end_date: '',
    description: '',
    company_name: '',
    company_website: '',
    company_location: '',
  };

  constructor(private httpclient: HttpClient) {}

  PostIntern() {
    this.httpclient
      .post('http://localhost:8000/api/interns', this.FormData, {
        headers: this.getHeaders(),
      })
      .subscribe((resulData: any) => {
        console.log(resulData);

        this.FormData.title = '';
        this.FormData.category_id = '';
        this.FormData.type = '';
        this.FormData.last_date = '';
        this.FormData.start_date = '';
        this.FormData.end_date = '';
        this.FormData.address = '';
        this.FormData.description = '';
        this.FormData.roles = '';
        this.FormData.position = '';
        this.FormData.company_name = '';
        this.FormData.company_website = '';
        this.FormData.company_location = '';
      });
  }

  DisplayOneIntern() {}

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
