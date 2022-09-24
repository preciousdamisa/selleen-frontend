import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default class CustomValidators {
  static mustMatch(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup?.get(controlName);
      const matchingControl = formGroup?.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
      return null;
    };
  }
}

export function getInputErrors(
  label: string,
  control: AbstractControl | null,
  custom?: { key: string; message: string }
): string[] {
  const { touched, errors } = control!;
  const errMsgs: string[] = [];

  if (touched && errors) {
    if (errors['required']) {
      errMsgs.push(`${label} is required`);
    }

    if (errors['minlength']) {
      errMsgs.push(
        `${label} should be at least ${errors['minlength']['requiredLength']} characters`
      );
    }

    if (errors['maxlength']) {
      errMsgs.push(
        `${label} should be at most ${errors['maxlength']['requiredLength']} characters`
      );
    }

    if (errors['min']) {
      errMsgs.push(`${label} can't be less than ${errors['min']['min']}`);
    }

    if (errors['max']) {
      errMsgs.push(`${label} can't be greater than ${errors['max']['max']}`);
    }

    if (errors['pattern']) {
      errMsgs.push(`${label} isn't in the right format`);
    }

    if (errors['email']) {
      errMsgs.push(`${label} is invalid`);
    }

    if (custom && errors[custom.key]) {
      errMsgs.push(custom.message);
    }
  }

  return errMsgs;
}
