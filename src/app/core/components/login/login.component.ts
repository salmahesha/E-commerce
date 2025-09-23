import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly _AuthService =inject(AuthService);
  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _CookieService = inject(CookieService);
  private readonly _Router =inject(Router);
  invalidEmail!:string;
  loginForm : FormGroup = this._FormBuilder.group({
    email: [null , [Validators.required , Validators.email]],
    password : [null , [Validators.pattern(/^\w{6,10}$/),Validators.required]]
  });
  login(){
    if(this.loginForm.valid){
      this._AuthService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message == 'success'){
            this._CookieService.set('token',res.token);
            if(this._CookieService.get('token')){
              this._AuthService.decodeToken();
              console.log(this._AuthService.userInfo);
              
            }
            this._Router.navigate(['/home']);
          }else{
            console.log(res.message);
            
          }
          
        },error:(err)=>{
          console.log(err.error.message);
          this.invalidEmail = err.error.message;
          
        }
      })
      
    }
  }
  
}
