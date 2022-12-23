import { FormGroup, AbstractControl, ValidatorFn } from "@angular/forms";

export function ValidateURL(control: AbstractControl): {[key: string]: any} | null  {
    if (!(control.value.endsWith('.jpg') || control.value.endsWith('.jpeg'))) {
      return { 'urlInvalid': true };
    }
    return null;
  }