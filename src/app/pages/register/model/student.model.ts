import { FormlyFieldConfig } from '@ngx-formly/core';

export class contact {
  firstname: string = '';
  lastname: string = '';
  PhoneNumber: string = '';
  Email: string = '';
  password: string = '';

  formFields() {
    return <FormlyFieldConfig[]>[
      {
        key: 'firstname',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'FirstName',
          placeholder: 'Your First Name Eg: Edwin',
          required: true,
        },
        className: 'mat-form-field',
        validation: {
          messages: {
            required: 'You Need to provide a Fist Name!',
          },
        },
      },
      {
        key: 'lastname',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Last Name',
          placeholder: 'Your Last Name Eg: Fom',
          required: true,
        },
        validation: {
          messages: {
            required: 'You Need to provide a Last Name!',
          },
        },
      },
      {
        key: 'PhoneNumber',
        type: 'input',
        templateOptions: {
          type: 'tel',
          label: 'Phone Number',
          placeholder: 'Your Phone Number Eg: 6 93 23 34 25',
          required: true,
        },
        validation: {
          messages: {
            required: 'You Need to provide a Phone!',
          },
        },
      },
      {
        key: 'Email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email ',
          placeholder: 'Your Email Eg: internglobe@gmail.com',
          required: true,
        },
        validation: {
          messages: {
            required: 'You Need to provide an Email!',
          },
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Password',
          placeholder: 'Your Password  Eg: ******',
          required: true,
        },
        validation: {
          messages: {
            required: 'You Need to provide a PassWord!',
          },
        },
      },
    ];
  }
}
