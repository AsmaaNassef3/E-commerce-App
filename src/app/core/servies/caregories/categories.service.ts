import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private httpClint :HttpClient) { }

getAllCategories():Observable<any>{
  return this.httpClint.get('https://ecommerce.routemisr.com/api/v1/categories')
};

getSpecificCategories(id:string):Observable<any>{
  return this.httpClint.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
}




}
