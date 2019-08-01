import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  transform(value: any, type: 'string' | 'number' | 'float'): any {
    switch (type) {
      case 'string':
        return String(value);
      case 'number':
        return parseFloat(value);
    }
    return value;
  }
}
