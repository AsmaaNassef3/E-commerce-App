import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

submitForm():void{

if(this.checkOutForm.valid){
  console.log(this.checkOutForm.value)
}
else{
  console.log("form is invalid")
}
this.ordersService.checkOutPayMent(this.cartId , this.checkOutForm.value).subscribe({

  next:(res)=>{
    console.log(res)
    if(res.status =='success'){
open(res.session.url,'_self')
    }
  },
  error:(err)=>{
    console.log(err)
  }
})

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
