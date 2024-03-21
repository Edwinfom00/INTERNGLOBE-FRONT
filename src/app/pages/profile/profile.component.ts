import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  maxDate: string;
  constructor(private httpclient: HttpClient) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }

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

  onFileSelected(event: any) {
    // this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.UpdateCoverLetterProfile();
  }
  UpdateCoverLetterProfile() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('cover_letter', this.selectedFile, this.selectedFile.name);

    // Ensure getHeaders() isn't setting Content-Type
    const headers = this.getHeaders();
    headers.delete('Content-Type'); // This removes Content-Type header, if it was set

    this.httpclient
      .post('http://localhost:8000/api/user/profile/coverletter', formData, {
        headers: headers,
      })
      .subscribe(
        (response) => console.log(response),
        (error) => console.error(error)
      );
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
