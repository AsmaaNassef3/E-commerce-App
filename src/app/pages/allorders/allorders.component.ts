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
  this.ordersService.saveUserTaken();
  // Try to get userId from OrdersService, or decode from localStorage if missing
  let userId = this.ordersService.userId;
  if (!userId && localStorage.getItem('userTaken')) {
    try {
      const jwt: any = JSON.parse(atob(localStorage.getItem('userTaken')!.split('.')[1]));
      userId = jwt.id;
      this.ordersService.userId = userId;
    } catch (e) {
      console.error('Failed to decode userTaken token:', e);
    }
  }
  if (userId && typeof userId === 'string') {
    this.getUsersData();
  } else {
    this.isLoading = false;
    console.error('User ID is missing. Please log in again.');
    // Optionally: show a message to the user to re-login
  }
}

getUsersData(): void {
  this.isLoading = true;
  this.ordersService.getUsersOrders(this.ordersService.userId).subscribe({
    next: (res) => {
      this.userAllData = res.data || [];
      this.isLoading = false;
    },
    error: (err) => {
      console.log(err);
      this.isLoading = false;
    }
  });
}
}




