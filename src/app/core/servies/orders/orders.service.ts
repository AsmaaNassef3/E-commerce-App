import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myToken:any=localStorage.getItem('userTaken')
  constructor(private httpClient : HttpClient) { }
  userData:any=null
userId:any=null
checkOutPayMent(id:string , data:object):Observable<any>{

  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://e-commerce-app-lyart-gamma.vercel.app`,
    {
      "shippingAddress":data
  },
  )
}


getUsersOrders(id:string):Observable<any>{

return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

}


saveUserTaken():void{
if(localStorage.getItem('userTaken') !== null){

 this.userData= jwtDecode(localStorage.getItem('userTaken')!)
 console.log('userData',this.userData.id)
this.userId=this.userData.id

}

}


}
