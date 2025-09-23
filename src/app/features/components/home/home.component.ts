import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { CategorySliderComponent } from "./components/category-slider/category-slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../core/interfaces/icart.interface';
import { WishListService } from '../../../shared/services/WishList/wish-list.service';
import { Daum, IWishList } from '../../../core/interfaces/iwish-list.interface';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/Search/search-pipe';

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, CategorySliderComponent, CarouselModule, RouterLink, CurrencyPipe,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private Toastr: ToastrService, private _WishListService:WishListService) { }
  productsInCart!: Product[];
  productsInWishlist!: Daum[];
  products!: IProduct[]
    searchValue:string ='';

  ngOnInit(): void {
    
    this._ProductsService.getAllProducts({page:1}).subscribe({
      next: (res) => {
        this.products = res.data
        console.log(this.products);
       

      },
      error: (err) => {
        console.log(err);

      }
    });
    this._WishListService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this._WishListService.whishListItems.next(res);
        this.productsInWishlist = res.data;
      }
    });


  }
  addToCart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartCount.next(res.numOfCartItems);

        this.Toastr.success(res.message, `${res.status}`);
      }
    })
  }

   addToWhishList(p_id: string) {
    this._WishListService.addProductToWishlist(p_id).subscribe({
      next: (res) => {
        console.log(res);

        this.Toastr.success(res.message, `${res.status}❤️`);
        this._WishListService.getLoggedUserWishlist().subscribe({
          next: (res2) => {
            this._WishListService.whishListItems.next(res2);
            this.productsInWishlist = res2.data;
          }
        });
      }
    })
  }
  isInWishList(p_id: string) {

    for (let item of this.productsInWishlist) {
      if (p_id === item._id) {
        return true;
      }
    }

    return false;

  }


}
