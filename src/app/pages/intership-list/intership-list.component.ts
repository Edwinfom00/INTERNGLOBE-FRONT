import { Component } from '@angular/core';

@Component({
  selector: 'app-intership-list',
  templateUrl: './intership-list.component.html',
  styleUrls: ['./intership-list.component.css'],
})
export class IntershipListComponent {
  link: any = [
    { link: 'About Us' },
    { link: 'Contact Us' },
    { link: 'Our Services' },
    { link: 'Privacy Policy' },
    { link: 'Terms & Condition' },
  ];
}
