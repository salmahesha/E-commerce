import { Component, inject } from '@angular/core';
import { OrdersService } from '../../../shared/services/Orders/orders.service';
import { IOrders } from '../../../core/interfaces/iorders.interface';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [CurrencyPipe,DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {
private readonly _OrdersService = inject(OrdersService);
private readonly _AuthService = inject(AuthService);

orders!:IOrders[]  ;
user_id!:string;
ngOnInit() {
this.user_id=this._AuthService.userInfo.id;


  this._OrdersService.getUserOrders(this.user_id).subscribe({
    next:(res)=>{
      this.orders = res;
      console.log(this.orders);
      
    }
  })
}
}
