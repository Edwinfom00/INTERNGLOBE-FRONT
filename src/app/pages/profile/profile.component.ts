import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @ViewChild('coverLetterInput')
  coverLetterInput!: ElementRef<HTMLInputElement>;
  constructor(private httpclient: HttpClient) {}

  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }

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
      });
  }

  doUpdate(event: Event) {
    event.preventDefault();
    this.UpdateCoverLetterProfile(event);
  }
  UpdateCoverLetterProfile(event: any) {
    const inputElement = event.target.querySelector('input[type="file"]');
    if (inputElement.files && inputElement.files.length > 0) {
      const coverLetter = inputElement.files[0];

      if (coverLetter.type == 'application/pdf') {
        const formData = new FormData();

        formData.append('cover_letter', coverLetter);

        console.log(formData);

        this.httpclient
          .put('http://localhost:8000/api/user/profile/coverletter', formData, {
            headers: this.getHeaders(),
          })
          .subscribe((resulData: any) => {
            console.log(resulData);
          });
      } else {
        alert('Enter PDF file');
      }
    }
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
