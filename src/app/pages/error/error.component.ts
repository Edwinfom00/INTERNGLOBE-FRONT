import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  link: any = [
    { link: 'About Us' },
    { link: 'Contact Us' },
    { link: 'Our Services' },
    { link: 'Privacy Policy' },
    { link: 'Terms & Condition' },
  ];
}
