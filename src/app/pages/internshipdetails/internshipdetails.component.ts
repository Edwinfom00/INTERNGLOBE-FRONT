import { Component } from '@angular/core';

@Component({
  selector: 'app-internshipdetails',
  templateUrl: './internshipdetails.component.html',
  styleUrls: ['./internshipdetails.component.css'],
})
export class InternshipdetailsComponent {
  link: any = [
    { link: 'About Us' },
    { link: 'Contact Us' },
    { link: 'Our Services' },
    { link: 'Privacy Policy' },
    { link: 'Terms & Condition' },
  ];
}
