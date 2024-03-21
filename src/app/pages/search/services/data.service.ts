import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  ApiUrl = 'http://localhost:8000/api';

  getInternShipName(name: string) {
    const response = new Promise((resolve) => {
      this.http.get(`${this.ApiUrl}/search?search_interns=${name}`).subscribe(
        (response) => {
          resolve(response);
        },
        (err) => {
          resolve(err);
        }
      );
    });
    return response;
  }
}
