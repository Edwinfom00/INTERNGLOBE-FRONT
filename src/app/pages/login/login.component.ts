import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private httpClient: HttpClient,
    private toastrservice: ToastrService
  ) {}

  Login() {
    this.httpClient
      .post('http://localhost:8000/api/login', this.formData)
      .subscribe({
        next: (response: any) => {
          if (response.access_token) {
            // Stocker le jeton d'accès dans le stockage local
            localStorage.setItem('access_token', response.access_token);
            // Vous pouvez également stocker d'autres informations utilisateur si nécessaire
            // localStorage.setItem('user', JSON.stringify(response.user));

            console.log(response);
            this.formData.email = '';
            this.formData.password = '';

            this.toastrservice.success(JSON.stringify(response.message), '', {
              timeOut: 3000,
              progressBar: true,
            });
          }
        },
        error: (error) => {
          this.toastrservice.error(JSON.stringify(error.message), '', {
            timeOut: 3000,
            progressBar: true,
          });
        },
      });
  }

  // Fonction pour se connecter avec Google
  LoginWithGoogle() {
    this.httpClient
      .get('http://localhost:8000/api/auth/google/redirect')
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
