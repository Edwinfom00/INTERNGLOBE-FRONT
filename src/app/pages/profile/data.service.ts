import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }
  constructor(private httpclient: HttpClient) {}

  ApiUrl = 'http://localhost:8000';

  UploadCoverLetter(data) {
    return this.httpclient.post(
      this.ApiUrl + '/api/user/profile/coverletter',
      data,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
