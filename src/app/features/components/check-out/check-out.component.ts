import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { OrdersService } from '../../../shared/services/Orders/orders.service';
import { AuthService } from '../../../shared/services/authentication/auth.service';
@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
private readonly _ActivatedRoute = inject(ActivatedRoute);
private readonly _OrdersService = inject(OrdersService);
private readonly _FormBuilder = inject(FormBuilder);
private readonly _AuthService = inject(AuthService);
private readonly _Router = inject(Router);
checkOutForm=new FormGroup({
  details:new FormControl(null, [Validators.required,Validators.minLength(3)]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[125][1-9]{8}$/)]),
  city:new FormControl(null, Validators.required),
});
paymentMethod : FormGroup = this._FormBuilder.group({
  method:[null , Validators.required]
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
payment(){
  if(this.checkOutForm.valid&&this.paymentMethod.valid&&this.paymentMethod.get('method')?.value === 'visa'){
  this.visa();
}
else if(this.checkOutForm.valid&&this.paymentMethod.get('method')?.value === 'cash'){
  this.cash();
}
}
visa(){
    console.log(this.checkOutForm , this.paymentMethod.value);
    this._OrdersService.CheckoutSession(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        if(res.status=='success'){
          window.open(res.session.url,'_self');
        }
      }
    })

}
cash(){
    this._AuthService.decodeToken();
      this._OrdersService.createCashOrder(this.cartId,this.checkOutForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status == 'success'){
            this._Router.navigate(['/allorders']);
          }
          
        },
        error:(err)=>{
          console.log(err);
          
            this._Router.navigate(['/cart']);

        }
      })
    }

}
