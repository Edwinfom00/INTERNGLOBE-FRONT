import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  link: any = [
    { link: 'About Us' },
    { link: 'Contact Us' },
    { link: 'Our Services' },
    { link: 'Privacy Policy' },
    { link: 'Terms & Condition' },
  ];
}
