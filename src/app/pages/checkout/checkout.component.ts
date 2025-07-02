import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/servies/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
private readonly formBuilder =inject(FormBuilder);
private readonly activatedRoute =inject(ActivatedRoute);
private readonly ordersService =inject(OrdersService);
private readonly router = inject(Router);
cartId:string=''
checkOutForm !:FormGroup
ngOnInit(): void {
this.initForm()
this.getCartId()
}
initForm():void{

this.checkOutForm = this.formBuilder.group({

  details:[null,[Validators.required]],
  phone:[null,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city:[null,[Validators.required]],

   })
}

  submitForm(): void {
    if (this.checkOutForm.valid) {
      this.ordersService.checkOutPayMent(this.cartId, this.checkOutForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            if (res.session && res.session.url) {
              

              window.open(res.session.url, '_self');
            } else {
              // ✅ الدفع تم بدون Gateway خارجي
              this.router.navigate(['/allorders']);
            }
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      console.log('form is invalid');
    }

  }



getCartId():void{
this.activatedRoute.paramMap.subscribe({
  next:(parm)=>{
console.log(parm.get('id'))
this.cartId=parm.get('id')!
  }
})
}

}
