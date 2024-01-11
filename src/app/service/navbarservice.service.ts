import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarserviceService {
  constructor(public navbarService: NavbarserviceService) {}

  isNavbarHidden: boolean = false;

  toggleNavbar() {
    this.navbarService.isNavbarHidden = !this.navbarService.isNavbarHidden;
  }
}
