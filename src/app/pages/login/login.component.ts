import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData = {
    email: '',
    password: '',
    google_id: '',
  };

  showSuccessAlert = false;
  constructor(private httpClient: HttpClient) {}

  Login() {
    this.httpClient
      .post('http://localhost:8000/api/login', this.formData)
      .subscribe((response: any) => {
        if (response.access_token) {
          // Stocker le jeton d'accès dans le stockage local
          localStorage.setItem('access_token', response.access_token);
          // Vous pouvez également stocker d'autres informations utilisateur si nécessaire
          // localStorage.setItem('user', JSON.stringify(response.user));

          this.showSuccessAlert = true; // Affiche l'alerte
          this.formData.email = '';
          this.formData.password = '';
        }
      });
  }
  LoginWithGoogle() {
    this.httpClient
      .post('http://localhost:8000/api/login/google', this.formData)
      .subscribe((readData: any) => {
        console.log(readData);

        this.formData.google_id = '';
      });
  }

  // Fonction pour récupérer le jeton d'accès stocké
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
