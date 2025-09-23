import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct.interface';

@Pipe({
  name: 'search',
  standalone : true
})
export class SearchPipe implements PipeTransform {

  transform(arr:IProduct[],searchKey:string): IProduct[] {
    return arr.filter(item=> item.title.toLowerCase().includes(searchKey));
  }

}
