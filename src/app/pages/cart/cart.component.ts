import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/servies/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
private readonly cartService=inject(CartService)
cartDetails:Icart={} as Icart


  ngOnInit(): void {
this.getCartData()
  }
  getCartData():void{

    this.cartService.getLoggedUserCart().subscribe({

  next:(res)=>{
    console.log(res.data)
  this.cartDetails =res.data
  },
  error:(err)=>{
    console.log(err)
  }
    })
  }
removeItem(id:string):void{

  this.cartService.removeSpecificCartItem(id).subscribe({

    next:(res)=>{
      console.log(res.data)
this.cartDetails=res.data
this.cartService.cartNum.set(res.numOfCartItems)
    },
    error:(err)=>{
      console.log(err)
    }

  })
}

clearCart():void{

  this.cartService.clearAllCart().subscribe({

    next:(res)=>{
      console.log(res)
      this.cartService.cartNum.set(0)
      if(res.message == 'success'){
this.cartDetails = {} as Icart
      }

    },
    error:(err)=>{
      console.log(err)
    }

  })
}

updateCount(id:string,count:number):void{
  this.cartService.updateProductQuantity(id,count).subscribe({
    next:(res)=>{
      console.log(res.data)
    this.cartDetails =res.data
    },
    error:(err)=>{
      console.log(err)
    }


  })
}

}
