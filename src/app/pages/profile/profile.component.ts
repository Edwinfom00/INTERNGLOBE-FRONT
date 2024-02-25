import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private httpclient: HttpClient) {}

  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }

  FormData = {
    name: '',
    email: '',
    address: '',
    gender: '',
    dob: '',
    phone: '',
    bio: '',
    cover_letter: '',
    resume: '',
    avatar: '',
  };

  UpdateProfile() {
    this.httpclient
      .put('http://localhost:8000/api/user/profile/update', this.FormData, {
        headers: this.getHeaders(),
      })
      .subscribe((resultData: any) => {
        console.log(resultData);

        this.FormData.name = '';
        this.FormData.address = '';
        this.FormData.gender = '';
        this.FormData.name = '';
        this.FormData.dob = '';
        this.FormData.phone = '';
        this.FormData.bio = '';
        this.FormData.cover_letter = '';
        this.FormData.resume = '';
        this.FormData.name = '';
        this.FormData.avatar = '';
      });
  }
}
