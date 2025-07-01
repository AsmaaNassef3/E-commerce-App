import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/servies/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/servies/caregories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/servies/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/servies/wishlist/wishlist.service';





@Component({
  selector: 'app-home',
  imports: [ CarouselModule ,RouterLink, SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


text:string=''

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
   items:1,
    nav: false
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  private readonly productsService = inject(ProductsService);

 private readonly categoriesServies =inject(CategoriesService);
 private readonly cartService =inject(CartService)
  private readonly wishlistService =inject(WishlistService)
 private readonly tostrService =inject(ToastrService)

// products:Iproduct[]=[];
products:WritableSignal<Iproduct[]>=signal([])
categories :WritableSignal<Icategories[]>= signal([])

getHomeData():void{
  this.productsService.getAllProducts().subscribe({
    next: (res) => {
      console.log(res.data);
      this.products.set(res.data)      //this.products=res.data
    },
    error: (err) => {
      console.log(err);
    }
  });
};

getCategoriesData():void{
  this.categoriesServies.getAllCategories().subscribe({
    next: (res) => {
      console.log(res.data);
this.categories.set(res.data)      //this.categories=res.data;

    },
    error: (err) => {
      console.log(err);
    }
  })
}



  ngOnInit(): void {
this.getHomeData()
this.getCategoriesData()

  }

addToCart(id:string):void{
this.cartService.AddProductToCart(id).subscribe({

next:(res)=>{
  if(res.status == 'success'){
this.tostrService.success("Frech Cart",res.message)
this.cartService.cartNum.set(res.numOfCartItems)

  }
console.log(res)
},
error:(err)=>{
  console.error('Add to cart error:', err);
  if (err.status === 401) {
    alert('Session expired. Please login again.');
  }
}

})

}

AddToWishList(id:string):void{
this.wishlistService.addProductToWishlist(id).subscribe({
  next:(res)=>{
    if(res.status == 'success'){
   console.log('wishlist',res.data.length)
   this.tostrService.success("Frech Cart",res.message)
   this.wishlistService.wishlistCount.set(res.data.length)
    }

  },
  error:(err)=>{
    console.log(err)
  }
})
}

}

