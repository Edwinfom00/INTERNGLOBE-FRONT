import { Component, OnInit, HostBinding, effect, signal } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 5000, noPause: true, showIndicators: false },
    },
  ],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private translateService: TranslateService) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
  }
  translate(key: string): string {
    return this.translateService.translations(key);
  }
  option: any = [
    { emplacement: 'emplacement1' },
    { emplacement: 'emplacement2' },
    { emplacement: 'emplacement2' },
    { emplacement: 'emplacement4' },
  ];
  option2: any = [
    { location: 'location1' },
    { location: 'location2' },
    { location: 'location3' },
    { location: 'location4' },
  ];

  slides = [
    { image: 'assets/img/1.jpg', text: 'First' },
    { image: 'assets/img/2.jpg', text: 'Second' },
    { image: 'assets/img/3.jpg', text: 'Third' },
  ];
  noWrapSlides = false;
  showIndicator = true;
  link: any = [
    { link: 'About Us' },
    { link: 'Contact Us' },
    { link: 'Our Services' },
    { link: 'Privacy Policy' },
    { link: 'Terms & Condition' },
  ];
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }
}
