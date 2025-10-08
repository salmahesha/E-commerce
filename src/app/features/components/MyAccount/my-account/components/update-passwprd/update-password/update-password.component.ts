import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../../../../../../shared/services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-password',
  imports: [ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  constructor(private _AuthService :AuthService ,private _ToastrService:ToastrService){}
  /* "currentPassword":"123456",
      "password":"pass1234",
      "rePassword":"pass1234"*/
  updatePasswordForm = new FormGroup({
    currentPassword: new FormControl(null,[Validators.required, Validators.pattern(/^\w{6,10}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,10}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,10}$/)]),

  }, { validators: this.confirm })
  confirm(pass: AbstractControl) {
    if (pass.get('password')?.value === pass.get('rePassword')?.value) {
      return null;
    } else {
      return { missMatch: true }
    }
  }
  updatePassword(){
    this._AuthService.updateLoggedUserPassword(this.updatePasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == 'success'){
          this._ToastrService.success( "Password updated successfully" ,res.message);
          this._AuthService.signOut();
        }
        
      },
    error:(err)=>{
      console.log( err.error.errors.msg);
      
                

      console.log(err);
      
    }
    
    })
  }
}
