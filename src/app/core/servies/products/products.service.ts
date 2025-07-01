import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpclint :HttpClient) { }

getAllProducts():Observable<any>{
return this.httpclint.get('https://ecommerce.routemisr.com/api/v1/products')

}


getAllSpecificProducts(id:string | null):Observable<any>{
  return this.httpclint.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

  }

}
