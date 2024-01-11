import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { contact } from './model/student.model';

import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  studentForm: FormGroup;

  studentModel: contact;

  studentFields: Array<FormlyFieldConfig>;

  constructor() {
    this.studentForm = new FormGroup({});

    this.studentModel = new contact();

    this.studentFields = this.studentModel.formFields();
  }

  SubmitForm(contact: contact) {
    console.log(contact);
  }
}
