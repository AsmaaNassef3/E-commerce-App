import { Component, computed, inject, Input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/servies/cart/cart.service';
import { WishlistService } from '../../core/servies/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly cartService =inject(CartService);
    private readonly wishlistService =inject(WishlistService);
@Input() isLogin:boolean=true;
wishlistnumber:Signal<number>=computed(()=>this.wishlistService.wishlistCount())
cartCount:Signal<number>=computed(()=>this.cartService.cartNum())

ngOnInit(): void {
this.cartService.getLoggedUserCart().subscribe({
  next:(res)=>{
    console.log(res)

    this.cartService.cartNum.set(res.numOfCartItems)
this.wishlistService.wishlistCount.set(res.data.length)
  }
})


}

}
