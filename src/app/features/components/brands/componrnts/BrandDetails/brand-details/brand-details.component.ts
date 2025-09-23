import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../../../../shared/services/Products/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../../../../../core/interfaces/iproduct.interface';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../../../../shared/services/WishList/wish-list.service';
import { Daum } from '../../../../../../core/interfaces/iwish-list.interface';

@Component({
  selector: 'app-brand-details',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css'
})
export class BrandDetailsComponent {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  private readonly _WishListService = inject(WishListService);
  private readonly Toastr = inject(ToastrService);
  brand_id!: string;
  brand_name!: string;
  products: IProduct[]=[];
  productDetails!: IProduct;
  productsInWishList: Daum[]=[];
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.brand_id = param.get('b_id')!;
        this.brand_name = param.get('b_name')!;

        this._ProductsService.getAllProducts({page:1 , brand:this.brand_id}).subscribe({
          next: (res) => {
            this.products = res.data;
            console.log(res);
    
          }
        });
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
}
