import { Component, OnInit, HostBinding, effect, signal } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Intern } from './model/interns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 5000, noPause: true, showIndicators: false },
    },
  ],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }
  constructor(
    private translateService: TranslateService,
    private httpclient: HttpClient
  ) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  allInterns: Intern[] = []; // ca c'est mon tableau pour afficher toutes les offres

  ngOnInit(): void {
    this.fetchIntern(); // grace a ceci ca s'applique automatiquement
  }

  onInternFetch() {
    this.fetchIntern();
  }
  translate(key: string): string {
    return this.translateService.translations(key);
  }
  option: any = [
    { emplacement: 'emplacement1' },
    { emplacement: 'emplacement2' },
    { emplacement: 'emplacement2' },
    { emplacement: 'emplacement4' },
  ];
  option2: any = [
    { location: 'location1' },
    { location: 'location2' },
    { location: 'location3' },
    { location: 'location4' },
  ];

  slides = [
    { image: 'assets/img/1.jpg', text: 'First' },
    { image: 'assets/img/2.jpg', text: 'Second' },
    { image: 'assets/img/3.jpg', text: 'Third' },
  ];
  noWrapSlides = false;
  showIndicator = true;
  link: any = [
    { link: 'About Us' },
    { link: 'Contact Us' },
    { link: 'Our Services' },
    { link: 'Privacy Policy' },
    { link: 'Terms & Condition' },
  ];
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  private fetchIntern() {
    // c'est la fonction pour afficher les information
    this.httpclient
      .get<{ [key: string]: Intern }>('http://localhost:8000/api/home')
      .pipe(
        // ceci me permet de convertir en objet
        map((res) => {
          const interns = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              interns.push({ ...res[key], id: key });
            }
          }
          return interns;
        })
      )
      .subscribe((interns) => {
        // console.log(interns);
        this.allInterns = interns;
        // console.log(this.allInterns);
      });
  }
}
