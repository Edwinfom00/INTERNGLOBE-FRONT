import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intership-list',
  templateUrl: './intership-list.component.html',
  styleUrls: ['./intership-list.component.css'],
})
export class IntershipListComponent implements OnInit {
  constructor(private httpclient: HttpClient, private route: Router) {
    this.NewFetchIntern();
  }

  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }

  ngOnInit(): void {
    this.NewFetchIntern();
  }

  InternData: any = [];
  n: number = 25; // ou n peut être n'importe quelle valeur que vous voulez
  date: Date = new Date();

  formAdd = {
    id: '',
  };
  GetDetailOffer(IntenrId: number) {
    this.httpclient
      .get(`http://localhost:8000/api/interns/${IntenrId}`)
      .subscribe((res: any) => {
        this.route.navigate(['/intershipdetails', IntenrId]);
      });
  }
  AddToFavorite(IntenrId: number) {
    this.httpclient
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

  link: any = [
    { link: 'À Propos de Nous' }, // About Us
    { link: 'Contactez-Nous' }, // Contact Us
    { link: 'Nos Services' }, // Our Services
    { link: 'Politique de Confidentialité' }, // Privacy Policy
    { link: 'Conditions Générales' }, // Terms & Condition
  ];

  length = Array.from({ length: 25 }, (x, i) => i);

  NewFetchIntern() {
    this.httpclient
      .get('http://localhost:8000/api/home')
      .subscribe((res: any) => {
        console.log(res);
        this.InternData = res;
      });
  }
}
