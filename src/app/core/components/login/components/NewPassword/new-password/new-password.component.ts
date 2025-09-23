import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../../../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
    private readonly Toastr = inject(ToastrService);

  newPass = new FormGroup({
    newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,10}$/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,10}$/)]),
  },{validators:this.confirm});

  confirm(pass:AbstractControl){
    if(pass.get('newPassword')?.value === pass.get('rePassword')?.value){
      return null;
    }else{
      return {missMatch:true}
    }
  }
  ngOnInit() {
    console.log(this._AuthService.userEmail);
    
  }
  changePass(){
    this._AuthService.resetPassword(this._AuthService.userEmail,this.newPass.get('newPassword')?.value!).subscribe({
      next:(res)=>{
        console.log(res);
       if(res.token){
        this.Toastr.success('Success', 'Successful password reset');
        this._Router.navigate(['/login']);
       }
      },
     
    })
  }
}

