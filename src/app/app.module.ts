import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './pages/navbar/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

import { AboutComponent } from './pages/about/about.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { InternshipdetailsComponent } from './pages/internshipdetails/internshipdetails.component';
import { IntershipListComponent } from './pages/intership-list/intership-list.component';
import { CategoryComponent } from './pages/category/category.component';
import { ErrorComponent } from './pages/error/error.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    InternshipdetailsComponent,
    IntershipListComponent,
    CategoryComponent,
    ErrorComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CarouselModule,
    AlertModule,
    ButtonsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
