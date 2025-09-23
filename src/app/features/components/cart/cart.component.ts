import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ICart } from '../../../core/interfaces/icart.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private readonly _CartService = inject(CartService);

  cartData = signal<ICart | null>(null);

  ngOnInit() {
    this._CartService.getLogUserCart().subscribe({
      next: (res) => {
        this.cartData.set(res.data);

        console.log(this.cartData());

      },
      error: (err) => {
        console.log(err);

      }
    });




  }
  removeItem(p_id: string) {
    this._CartService.removeSpecificCartItem(p_id).subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        console.log(res);

      }
    })
  }
  changeQuantity(p_id: string, count: number) {
    this._CartService.updateCartProductQuantity(p_id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData.set(res.data)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  clearCart() {
    this._CartService.clearUserCart().subscribe({
      next: (res) => {


        this.cartData.set(null);
        this._CartService.cartCount.next(0);
        console.log(res, 'res:', this.cartData);
      },
      error: (err) => console.log(err)
    });
  }

}
