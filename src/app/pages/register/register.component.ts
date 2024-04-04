import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrservice: ToastrService
  ) {} // Injecter le Router

  ngOnInit(): void {}
  Register() {
    this.http
      .post('http://localhost:8000/api/register', this.formData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.toastrservice.success('Compte créé avec succès', '', {
            timeOut: 3000,
            progressBar: true,
          });
          switch (this.formData.user_type) {
            case 'company':
              this.router.navigate(['/companyprofile']);
              break;
            case 'user':
              this.router.navigate(['/setting']);
              break;
            case 'university':
              this.router.navigate(['/universityprofile']);
              break;
            default:
              throw new Error('Invalid user type');
          }

          this.formData.name = '';
          this.formData.email = '';
          this.formData.password = '';
          this.formData.user_type = '';
        },
        (error) => {
          if (error.status === 422) {
            // Gérer les erreurs de validation renvoyées par Laravel
            console.log(error.error); // Afficher les détails des erreurs dans la console
            // Afficher les messages d'erreur à l'utilisateur
          } else {
            console.error("Une erreur inattendue s'est produite :", error);
            // Gérer d'autres types d'erreurs
          }
        }
      );
  }
}
