import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter',
  standalone: true
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
