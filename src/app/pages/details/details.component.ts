import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/servies/products/products.service';
import { IproductDetails } from '../../shared/interfaces/iproduct-details';
import { CartService } from '../../core/servies/cart/cart.service';


@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

private readonly activatedRoute =inject(ActivatedRoute)
private readonly productsService =inject(ProductsService)
private readonly cartService =inject(CartService)

  currentMainImage: string = ''
 detailsProduct : IproductDetails={} as IproductDetails

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next:(p)=>{
     let productId = p.get('id')


this.productsService.getAllSpecificProducts(productId).subscribe({


  next:(res)=>{

console.log(res.data);
this.detailsProduct=res.data;
this.currentMainImage = this.detailsProduct.imageCover;
  },

  error:(err)=>{

    console.log(err)

      }
})
    }
  })
}


addToCart(id:string):void{
  this.cartService.AddProductToCart(id).subscribe({

  next:(res)=>{
  console.log(res)
  },
  error:(err)=>{
    console.log(err)
    }

  })

  }



changeMainImage(image: string): void {
  this.currentMainImage = image;
}
}



