import { Component, OnInit, HostBinding, effect, signal } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CommonModule, DatePipe } from '@angular/common';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { InternServiceService } from './service/intern-service.service';

// interface Intern {
//   user_id: string;
//   company_id: string;
//   title: 'fbgkfbbjgfjkb';
//   slug: string;
//   description: string;
//   roles: string;
//   category_id: string;
//   position: string;
//   address: string;
//   featured: string;
//   type: string;
//   status: string;
//   last_date: string;
// }
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
    private httpclient: HttpClient,
    private route: Router,
    private datepipe: DatePipe,
    private internsService: InternServiceService
  ) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  // allInterns: Intern[] = []; // ca c'est mon tableau pour afficher toutes les offres
  InternData: any;
  n: number = 10; // ou n peut être n'importe quelle valeur que vous voulez
  date: Date = new Date();

  range(n: number): number[] {
    return Array(n)
      .fill(0)
      .map((x, i) => i);
  }

  ngOnInit(): void {
    // this.fetchIntern(); // grace a ceci ca s'applique automatiquement
    this.NewFetchIntern();
    this.GetCategory();
  }

  onInternFetch() {
    // this.fetchIntern();
  }
  translate(key: string): string {
    return this.translateService.translations(key);
  }

  noWrapSlides = false;
  showIndicator = true;
  link: any = [
    { link: 'À Propos de Nous' }, // About Us
    { link: 'Contactez-Nous' }, // Contact Us
    { link: 'Nos Services' }, // Our Services
    { link: 'Politique de Confidentialité' }, // Privacy Policy
    { link: 'Conditions Générales' }, // Terms & Condition
  ];
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  // fetchIntern() {
  //   // c'est la fonction pour afficher les information
  //   this.httpclient
  //     .get<{ [key: string]: Intern }>('http://localhost:8000/api/home')
  //     .pipe(
  //       // ceci me permet de convertir en objet
  //       map((res) => {
  //         const interns = [];
  //         for (const key in res) {
  //           if (res.hasOwnProperty(key)) {
  //             interns.push({
  //               ...res[key],
  //               id: key,
  //             });
  //           }
  //         }
  //         return interns;
  //       })
  //     )
  //     .subscribe((interns) => {
  //       console.log(interns);
  //       this.allInterns = interns;
  //       console.log(this.allInterns);
  //       // this.f = this.allInterns;
  //     });
  // }

  length = Array.from({ length: 5 }, (x, i) => i);
  length2 = Array.from({ length: 6 }, (x, i) => i);
  NewFetchIntern() {
    this.httpclient
      .get('http://localhost:8000/api/home')
      .subscribe((res: any) => {
        console.log(res);
        this.InternData = res;
      });
  }

  GetDetailOffer(IntenrId: number) {
    this.httpclient
      .get(`http://localhost:8000/api/interns/${IntenrId}`)
      .subscribe((res: any) => {
        this.route.navigate(['/intershipdetails', IntenrId]);
      });
  }
  formAdd = {
    id: '',
  };

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
  searchCriteria: any = { title: '', type: '', category: '', address: '' };
  interns: any[] = [];
  searchInterns() {
    this.internsService.getAllInterns(this.searchCriteria).subscribe(
      (response) => {
        if (response.interns.length === 0) {
          this.route.navigateByUrl('error'); // Remplacez par le chemin de votre page 404
        } else {
          this.interns = response.interns;
        }
      },
      (error) => {
        // Gestion des erreurs ici
        console.error('Erreur lors de la récupération des Stages:', error);
        this.route.navigateByUrl('error');
      }
    );
  }
}
