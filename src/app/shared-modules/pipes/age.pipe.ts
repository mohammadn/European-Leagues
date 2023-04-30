import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: string): number {
    const currentYear = new Date().getFullYear();
    const playerBirthYear = Number(value.split('-')[0]);
    return currentYear - playerBirthYear;
  }
}
