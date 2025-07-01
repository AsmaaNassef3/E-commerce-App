import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

wishlistCount:WritableSignal<number>=signal(0)

  constructor(private httpclint :HttpClient) { }

addProductToWishlist(id:string):Observable<any>{

return this.httpclint.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
  {
    "productId": id
}
)

}


removeProductFromWishlist(id:string):Observable<any>{

return this.httpclint.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)

}
getLogedUserWishList():Observable<any>{

return this.httpclint.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)

}

}
