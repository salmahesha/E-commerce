import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../../../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.css'
})
export class ResetCodeComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  userEmail!:string;
   code = new FormGroup({
    resetCode:new FormControl(null,Validators.required)
   });
  ngOnInit() {
    
    this.userEmail = this._AuthService.userEmail();
  }
   confirmCode() {
     this._AuthService.VerifyResetCode(this.code.get('resetCode')?.value!).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status=='Success'){
          this._Router.navigate(['/newPassword']);
          


        }
        
        
        
      },
      complete:()=>{
        console.log('userEmail: ',this._AuthService.userEmail);
        
      }
     })
   }
}
