import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
    private readonly Toastr = inject(ToastrService);
  
  registerForm = new FormGroup({
    name  : new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
    email  : new FormControl(null,[Validators.email,Validators.required]),
    password  : new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,10}$/)]),
    rePassword  : new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,10}$/)]),
    phone  : new FormControl(null,[Validators.required,Validators.pattern(/^01[125][1-9]{8}$/)]),
  },{validators:this.confirm});

  confirm(pass:AbstractControl){
    if(pass.get('password')?.value === pass.get('rePassword')?.value){
      return null;
    }else{
      return {missMatch:true}
    }
  }
  register(){
    if(this.registerForm.valid){
      this._AuthService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          
          console.log(res);
          if(res.message == 'success' ){
            this.Toastr.success(res.message,res.status)

            this._Router.navigate(['/login'])
          }
          
        },
        error: (err) => {
          console.error(err);
        }
      })
      console.log(this.registerForm.value);
    }
  }


}
