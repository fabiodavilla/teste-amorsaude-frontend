import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map, of } from 'rxjs';

export function validateMinSelectionAsync(minSelections: number) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      map((value) => {
        if (!value || value.length < minSelections) {
          return { minSelection: { requiredCount: minSelections } };
        }

        return null;
      })
    );
  };
}
