import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/servies/orders/orders.service';
import { AuthService } from '../../core/servies/auth/auth.service';
import { AllOrders, Product } from '../../shared/interfaces/iall';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CommonModule,CurrencyPipe,DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly ordersService =inject(OrdersService);
  // userData:any=null
userAllData !: AllOrders[]
userCart!: Product[]
isLoading = true;
ngOnInit(): void {
this.getUsersData()
}

getUsersData():void{
  this.ordersService.saveUserTaken()
this.ordersService.getUsersOrders(this.ordersService.userId).subscribe({
  next:(res)=>{
    console.log(res)

 this.userAllData=res
  // this.userCart=res.  cartItems
  // console.log(res.cartItems)
 this.isLoading = false;
  },
  error:(err)=>{
    console.log(err)
    this.isLoading = false;
  }
})
}
}




