import { Component, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { WishListService } from '../../../shared/services/WishList/wish-list.service';
import { Daum } from '../../../core/interfaces/iwish-list.interface';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/Search/search-pipe';
import { IMetadata } from '../../../core/interfaces/imetadata.interface';

@Component({
  selector: 'app-products',
  imports: [CarouselModule, RouterLink, CurrencyPipe, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private _WishListService: WishListService, private _ProductsService: ProductsService, private _CartService: CartService, private Toastr: ToastrService, private _FlowbiteService: FlowbiteService) { }
  productsInWishList!: Daum[];
  products!: IProduct[];
  metadata =  {} as IMetadata;
  pageNumber:number = 1;
  searchValue: string = '';

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        
        this.metadata = res.metadata;

        console.log(res);


      },
      error: (err) => {
        console.log(err);

      }
    });
    this._WishListService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this._WishListService.whishListItems.next(res);
        this.productsInWishList = res.data;
      }
    });


  }
  addToCart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartCount.next(res.numOfCartItems);

        this.Toastr.success(res.message, `${res.status}❤️`);

      }
    })
  }
  addToWhishList(p_id: string) {
    this._WishListService.addProductToWishlist(p_id).subscribe({
      next: (res) => {
        console.log(res);

        this.Toastr.success(res.message, `${res.status}❤️`);
        this._WishListService.getLoggedUserWishlist().subscribe({
          next: (res) => {
            this._WishListService.whishListItems.next(res);
            this.productsInWishList = res.data;
          }
        });
      }
    })
  }
  isInWishList(p_id: string) {

    for (let item of this.productsInWishList) {
      if (p_id === item._id) {
        return true;
      }
    }

    return false;

  }
  changePage(page: number) {
    this.pageNumber = page;

    this._ProductsService.getAllProducts({ page: page }).subscribe({
      next: (res) => {
        this.products = res.data;
        this.metadata = res.metadata;
        console.log(res.metadata);

      }
    })
  }


}