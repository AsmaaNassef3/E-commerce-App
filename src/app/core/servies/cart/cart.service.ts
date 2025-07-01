import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartNum:WritableSignal <number> = signal(0)

  constructor(private httpClient : HttpClient) { }


AddProductToCart(id:string):Observable<any>{

return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
{
  "productId": id
},

)
};
getLoggedUserCart():Observable<any>{

  return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,


  )
  }

  removeSpecificCartItem(id:string):Observable<any>{

    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,


    )
    }

    clearAllCart():Observable<any>{

      return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,


      )
      }
    updateProductQuantity(id:string,myCount:number):Observable<any>{

      return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          "count": myCount
      },



      )
      }

}
