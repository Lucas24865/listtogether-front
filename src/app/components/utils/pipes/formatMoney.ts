import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMoney',
  standalone: true
})
export class FormatMoney implements PipeTransform {

  transform(value: number): string {
    return '$' + value.toFixed(2);
  }

}
