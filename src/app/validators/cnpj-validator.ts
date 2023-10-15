import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

export function cnpjLengthAsyncValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const cnpj = control.value?.replace(/\D/g, '');

    if (cnpj && cnpj.length !== 14) {
      return of({ cnpjLength: true });
    }

    return of(null);
  };
}
