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
      .subscribe((readData: any) => {
        console.log(readData);
        this.showSuccessAlert = true; // Affiche l'alerte
        this.formData.email = '';
        this.formData.password = '';
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
}
