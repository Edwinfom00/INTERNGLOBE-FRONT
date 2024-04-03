import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  link: any = [
    { link: 'À Propos de Nous' }, // About Us
    { link: 'Contactez-Nous' }, // Contact Us
    { link: 'Nos Services' }, // Our Services
    { link: 'Politique de Confidentialité' }, // Privacy Policy
    { link: 'Conditions Générales' }, // Terms & Condition
  ];
}
