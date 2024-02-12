import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    password: '',
    user_type: '',
  };
  showSuccessAlert = false;
  ngOnInit(): void {}

  constructor(private http: HttpClient) {}

  Register() {
    this.http
      .post('http://localhost:8000/api/register', this.formData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.showSuccessAlert = true; // Affiche l'alerte

        this.formData.name = '';
        this.formData.email = '';
        this.formData.password = '';
        this.formData.user_type = '';
      });
  }
}
