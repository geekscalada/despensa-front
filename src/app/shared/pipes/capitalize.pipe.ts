import { Pipe, PipeTransform } from '@angular/core';

//TODO: ExplicacionAqui!

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.toUpperCase() : value;
  }
}
