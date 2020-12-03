import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value, args: string[]): any {
    const keys = [];
    for (const key in value) {
      if (args && args.indexOf(key) < 0){
        keys.push(key);
      }
    }
    return keys;
  }
}
