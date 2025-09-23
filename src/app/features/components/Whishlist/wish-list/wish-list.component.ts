import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../../core/interfaces/icart.interface';
import { WishListService } from '../../../../shared/services/WishList/wish-list.service';
import {IWishList} from '../../../../core/interfaces/iwish-list.interface';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  private readonly _WishListService = inject(WishListService)
    wishListData = signal<IWishList | null>(null);

 
  ngOnInit() {
    this._WishListService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
                this.wishListData.set(res);

        console.log(this.wishListData());
        
      }
    })
  }
   removeItem(p_id: string) {
    this._WishListService.removeproductfromWishlist(p_id).subscribe({
      next: (res) => {
        this._WishListService.getLoggedUserWishlist().subscribe({
          next:(res)=>{
            this.wishListData.set(res);
            console.log(res);
            
          }
          
        })
        console.log(res);

      }
    })
  }
}
