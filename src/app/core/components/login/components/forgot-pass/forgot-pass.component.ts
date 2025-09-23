import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
    private readonly Toastr = inject(ToastrService);

  
  emailAddress = new FormGroup({
    email:new FormControl(null,[Validators.required , Validators.email]),
  });
  sendCode(){
    this._AuthService.forgotPassword({email:this.emailAddress.get('email')?.value}).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg == 'success'){

          this._AuthService.userEmail = this.emailAddress.get('email')?.value !;
          this._Router.navigate(['/resetCode'])
          this.Toastr.success(res.message,res.statusMsg);

        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
 
}
