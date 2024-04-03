import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CoverLetter } from './cover-letter.model';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  maxDate: string;
  constructor(
    private httpclient: HttpClient,
    private toastrservice: ToastrService,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }

  ngOnInit(): void {
    this.createForm();
  }

  getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }

  files: any;
  form: FormGroup;
  submitted: boolean = false;
  cover_letter = new CoverLetter();
  data: any;

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

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      cover_letter: [null, Validators.required],
    });
  }

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

  UpdatePassword() {
    this.httpclient
      .put('http://localhost:8000/api/user/profile/password', this.FormData, {
        headers: this.getHeaders(),
      })
      .subscribe({
        next: (resultData: any) => {
          console.log(resultData);

          this.FormData.current_password = '';
          this.FormData.new_password = '';
          this.toastrservice.success(JSON.stringify(resultData.message), '', {
            timeOut: 3000,
            progressBar: true,
          });
        },
        error: (error) => {
          this.toastrservice.error(JSON.stringify(error.message), '', {
            timeOut: 3000,
            progressBar: true,
          });
        },
      });
  }

  UploadCoverLetter(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formdata = new FormData();

    formdata.append('cover_letter', this.files, this.files.name);
    this.dataService.UploadCoverLetter(formdata).subscribe((data) => {
      this.data = data;
      console.log(this.data);
      this.toastrservice.success(JSON.stringify(this.data.message), '', {
        timeOut: 3000,
        progressBar: true,
      });
      this.form.reset();
    });
  }
}
