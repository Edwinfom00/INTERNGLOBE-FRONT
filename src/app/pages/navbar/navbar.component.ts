import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private matdialogReff: MatDialog) {}

  getDialog() {
    this.matdialogReff.open(LoginComponent);
  }

  CloseDialog() {
    this.matdialogReff.closeAll();
  }
}
