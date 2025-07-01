import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productOfObject:any[],klma:string): any[] {
    return productOfObject.filter((item)=>item.title.toLowerCase().includes(klma.toLowerCase()))
  }

}
