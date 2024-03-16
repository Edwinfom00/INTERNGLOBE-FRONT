import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intern } from '../model/intens.model';

@Injectable({
  providedIn: 'root',
})
export class InternServiceService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8000/api/search';

  getAllInterns(filters?: any): Observable<{ interns: Intern[] }> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params = params.append(key, filters[key]);
        }
      });
    }
    return this.http.get<{ interns: Intern[] }>(this.apiUrl, { params });
  }
}
