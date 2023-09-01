import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rgx = new RegExp(/^[a-zA-Z0-9-._]{0,}[@]{1}[a-zA-Z0-9]{0,}([.]{1}[a-zA-Z0-9]{1,})+$/);
    if (control.value === '' || rgx.test(control.value)) {
      return null;
    } else {
      return { invalidEmail: true };
    }
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rgx = new RegExp(/^(\b[(]?[0-9]{2}[)]?[\s]?[9][3-9][0-9]{3}[\s]?[-]?[0-9]{4}\b)$/);
    if (!control.value || rgx.test(control.value)) {
      return null;
    } else {
      return { invalidPhone: true };
    }
  };
}

export function displayNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rgx = new RegExp(/^(?![ ])(?!.*[ ]{2})(?!.*[ ]$)([a-zA-ZÀ-ú- ]{0,})+$/);
    if (!control.value || rgx.test(control.value)) {
      return null;
    } else {
      return { invalidDisplayName: true };
    }
  };
}

export function numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rgx = new RegExp(/^[0-9]{0,}$/);
      if (!control.value || rgx.test(control.value)) {
        return null;
      } else {
        return { invalidNumberName: true };
      }
    };
  }