import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/servies/wishlist/wishlist.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/servies/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly cartService = inject(CartService)
    private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)



wishlistData:Iwishlist[]=[]

ngOnInit(): void {
this.getUserWishlist()

}

getUserWishlist():void{
  this.wishlistService.getLogedUserWishList().subscribe({

    next:(res)=>{
      console.log(res)
this.wishlistData=res.data


    },
    error:(err)=>{
      console.log(err)
    }
  })
}



addToCart(id:string):void{
  this.cartService.AddProductToCart(id).subscribe({
    next:(res)=>{
      if(res.status == 'success'){
        this.cartService.cartNum.set(res.numOfCartItems);
        this.toastrService.success('Added to cart!', res.message);
      }
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

removeFromWishlist(id:string):void{
  this.wishlistService.removeProductFromWishlist(id).subscribe({
    next:(res)=>{
      console.log(res)
      // Refresh wishlist data
      this.getUserWishlist();
      // Update wishlist counter
      this.wishlistService.getLogedUserWishList().subscribe({
        next: (wishRes) => {
          this.wishlistService.wishlistCount.set(wishRes.data.length);
        }
      });
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

}

