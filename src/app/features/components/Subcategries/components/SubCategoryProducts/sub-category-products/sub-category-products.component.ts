import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../../../../shared/services/Products/products.service';
import { CartService } from '../../../../../../shared/services/Cart/cart.service';
import { WishListService } from '../../../../../../shared/services/WishList/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../../../../../core/interfaces/iproduct.interface';
import { Daum } from '../../../../../../core/interfaces/iwish-list.interface';

@Component({
  selector: 'app-sub-category-products',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './sub-category-products.component.html',
  styleUrl: './sub-category-products.component.css'
})
export class SubCategoryProductsComponent {
private readonly _ProductsService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  private readonly _WishListService = inject(WishListService);
  private readonly Toastr = inject(ToastrService);
  subcategory_id!: string;
  products: IProduct[]=[];
  productDetails!: IProduct;
  productsInWishList: Daum[]=[];
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.subcategory_id = param.get('c_id')!;

        this._ProductsService.getAllProducts({page:1 , subcategory:this.subcategory_id}).subscribe({
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


