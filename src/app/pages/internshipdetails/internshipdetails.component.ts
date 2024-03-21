import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-internshipdetails',
  templateUrl: './internshipdetails.component.html',
  styleUrls: ['./internshipdetails.component.css'],
})
export class InternshipdetailsComponent implements OnInit {
  link: any = [
    { link: 'About Us' },
    { link: 'Contact Us' },
    { link: 'Our Services' },
    { link: 'Privacy Policy' },
    { link: 'Terms & Condition' },
  ];

  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }

  detailedInternData: any;

  constructor(
    private route: ActivatedRoute,
    private httpclient: HttpClient,
    private datepipe: DatePipe
  ) {}
  ngOnInit(): void {
    const internId = this.route.snapshot.params['id'];
    this.GetDetailOffer(internId);
  }
  date: Date = new Date();

  GetDetailOffer(IntenrId: number) {
    this.httpclient
      .get(`http://localhost:8000/api/interns/${IntenrId}`)
      .subscribe((response: any) => {
        this.detailedInternData = Object.entries(response);
        console.log(this.detailedInternData);
      });
  }

  FormData = {
    user_id: '',
  };
  showSuccessAlert = false;
  showErrorAlert = false; // Ajout d'une variable pour afficher l'alerte d'erreur
  errorMessage = ''; // Variable pour stocker le message d'erreur

  ApplyIntern(InternId: number) {
    this.httpclient
      .post(
        `http://localhost:8000/api/applications/${InternId}`,
        this.FormData,
        {
          headers: this.getHeaders(),
        }
      )
      .subscribe({
        next: (res: any) => {
          this.showSuccessAlert = true;
          this.showErrorAlert = false; // Assurez-vous de cacher l'alerte d'erreur en cas de succès
          console.log(res);
        },
        error: (error) => {
          this.showSuccessAlert = false;
          this.showErrorAlert = true; // Afficher l'alerte d'erreur
          this.errorMessage = error.error.message; // Stocker le message d'erreur provenant de l'objet d'erreur
          console.error(error);
        },
      });
  }
  displayError(message: string) {
    this.errorMessage = message;
    this.showErrorAlert = true;
    // Fermez l'alerte après 5 secondes (5000 millisecondes)
    setTimeout(() => {
      this.closeErrorAlert();
    }, 5000);
  }

  closeErrorAlert() {
    this.showErrorAlert = false;
    this.errorMessage = '';
  }
}
