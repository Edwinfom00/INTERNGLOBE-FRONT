import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent {
  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }

  constructor(private httpclient: HttpClient) {}

  FormData = {
    cname: '',
    email: '',
    address: '',
    website: '',
    description: '',
    phone: '',
    banner: '',
    avatar: '',
    slogan: '',
    current_password: '',
    new_password: '',
  };

  UpdateWrittingCompayIformation() {
    this.httpclient
      .post('http://localhost:8000/api/companies/create', this.FormData, {
        headers: this.getHeaders(),
      })
      .subscribe((ResulData: any) => {
        alert(ResulData);
        this.FormData.cname = '';
        this.FormData.email = '';
        this.FormData.website = '';
        this.FormData.phone = '';
        this.FormData.slogan = '';
      });
  }
  UpdatePassword() {
    this.httpclient
      .put(
        'http://localhost:8000/api/companies/updatepassword',
        this.FormData,
        {
          headers: this.getHeaders(),
        }
      )
      .subscribe((resultData: any) => {
        console.log(resultData);

        this.FormData.current_password = '';
        this.FormData.new_password = '';
      });
  }
}
