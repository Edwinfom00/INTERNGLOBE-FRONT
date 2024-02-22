import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  FormData = {
    name: '',
    address: '',
    gender: '',
    dob: '',
    phone: '',
    bio: '',
    cover_letter: '',
    resume: '',
    avatar: '',
  };
}
