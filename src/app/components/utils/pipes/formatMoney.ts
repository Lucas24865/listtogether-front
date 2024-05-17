import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMoney',
  standalone: true
})
export class FormatMoney implements PipeTransform {

  transform(value: string): string {
    const num = parseFloat(value);
    if (isNaN(num)) {
        return 'Invalid input';
    }
    
    return '$' + num.toFixed(2);
  }

}
