import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { OrdersService } from '../../../shared/services/Orders/orders.service';
@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
private readonly _ActivatedRoute = inject(ActivatedRoute);
private readonly _OrdersService = inject(OrdersService);
checkOutForm=new FormGroup({
  details:new FormControl(null, [Validators.required,Validators.minLength(3)]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[125][1-9]{8}$/)]),
  city:new FormControl(null, Validators.required),
})

cartId!:string;
ngOnInit() {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
      this.cartId = param.get('c_id')!;
      console.log(this.cartId);
      
    }
  })
}
checkOut(){
  if(this.checkOutForm.valid){
    console.log(this.checkOutForm);
    this._OrdersService.CheckoutSession(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        if(res.status=='success'){
          window.open(res.session.url,'_self');
        }
      }
    })
  }
}
}
