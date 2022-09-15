import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'space',
})
export class SpacePipe implements PipeTransform {
  transform(value: string): string {
    const reg = /[A-Z-_\&](?=[a-z0-9]+)|[A-Z-_\&]+(?![a-z0-9])/g;
    const delimited = value?.replace(reg, ' $&').trim();
    return delimited;
  }
}
