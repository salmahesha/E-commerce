import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/interfaces/icart.interface';
import { Daum, IWishList } from '../../../core/interfaces/iwish-list.interface';
import { WishListService } from '../../../shared/services/WishList/wish-list.service';

@Component({
  selector: 'app-p-details',
  imports: [CarouselModule],
  templateUrl: './p-details.component.html',
  styleUrl: './p-details.component.css'
})
export class PDetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    navText: ['', ''],
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
    nav: false
  }

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly Toastr = inject(ToastrService);
  private readonly _WishListService = inject(WishListService);



  productID!: string;
  productDetails!: IProduct;
  productsInWishList!:Daum[];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productID = param.get('p_id')!;
      }

    });
    this._ProductsService.getSpecificProduct(this.productID).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        console.log(res.data);

      },
      error: (err) => {
        console.log(err);
      }

    });
    this._WishListService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this._WishListService.whishListItems.next(res);
        this.productsInWishList = res.data;
      }
    })
  }
  addToCart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res) => {

        console.log(res);
        
        this._CartService.cartCount.next(res.numOfCartItems);

        this.Toastr.success(res.message, `${res.status}❤️`,{
          
        });
    //     this._CartService.getLogUserCart().subscribe({
    //   next:(res)=>{
    //     this._CartService.cartItems.next(res.data.products);
    //     this.productsInWishList = res.data.products;
    //   }
    // })
        
        

      }
    })
  }
  addToWhishList(p_id: string) {
    this._WishListService.addProductToWishlist(p_id).subscribe({
      next: (res) => {

        console.log(res);
        

        this.Toastr.success(res.message, `${res.status}❤️`,{
          
        });
        this._WishListService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this._WishListService.whishListItems.next(res);
        this.productsInWishList = res.data;
      }
    })
        
        

      }
    })
  }
   isInWishList(p_id:string){
   
for(let item of this.productsInWishList ){
  if(p_id === item._id){
    return true;
  }
}
    
return false;
  
}

}
