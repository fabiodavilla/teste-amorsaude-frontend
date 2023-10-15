import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCnpjMask]',
})
export class CnpjMaskDirective {
  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 14) {
      value = value.slice(0, 14);
    }

    if (value.length <= 2) {
      value = this.formatValue(value, '$1');
    } else if (value.length <= 5) {
      value = this.formatValue(value, '$1.$2');
    } else if (value.length <= 8) {
      value = this.formatValue(value, '$1.$2.$3');
    } else if (value.length <= 12) {
      value = this.formatValue(value, '$1.$2.$3/$4');
    } else {
      value = this.formatValue(value, '$1.$2.$3/$4-$5');
    }

    input.value = value;
  }

  private formatValue(value: string, pattern: string) {
    return value.replace(new RegExp(pattern), pattern);
  }
}
