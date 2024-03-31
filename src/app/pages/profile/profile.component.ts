import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  maxDate: string;
  myForm: FormGroup;
  constructor(
    private httpclient: HttpClient,
    private formBuilder: FormBuilder
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    this.myForm = this.formBuilder.group({
      coverLetter: [''],
    });
  }

  private apiUrl = 'http://localhost:8000/api/user/profile/coverletter'; // Remplacez par l'URL de votre API si nécessaire.

  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }

  files: any;

  FormData = {
    name: '',
    email: '',
    address: '',
    gender: '',
    dob: '',
    current_password: '',
    new_password: '',
    phone: '',
    bio: '',
    resume: '',
    avatar: '',
    birthdate: null,
  };

  UpdateWritingProfile() {
    this.httpclient
      .put('http://localhost:8000/api/user/profile/update', this.FormData, {
        headers: this.getHeaders(),
      })
      .subscribe((resultData: any) => {
        console.log(resultData);

        this.FormData.name = '';
        this.FormData.address = '';
        this.FormData.gender = '';
        this.FormData.name = '';
        this.FormData.dob = '';
        this.FormData.phone = '';
        this.FormData.bio = '';
        this.FormData.birthdate = null;
      });
  }

  selectedFile: File = null;

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  upload(): void {
    if (this.selectedFile) {
      this.updateCoverLetter(this.selectedFile).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
      });
    }
  }

  updateCoverLetter(file: File) {
    const formData: FormData = new FormData();
    formData.append('cover_letter', file, file.name);
    // Envoyer la requête PUT.
    return this.httpclient.post(this.apiUrl, formData, {
      headers: this.getHeaders(),
    });
  }
  UpdatePassword() {
    this.httpclient
      .put('http://localhost:8000/api/user/profile/password', this.FormData, {
        headers: this.getHeaders(),
      })
      .subscribe((resultData: any) => {
        console.log(resultData);

        this.FormData.current_password = '';
        this.FormData.new_password = '';
      });
  }
}
