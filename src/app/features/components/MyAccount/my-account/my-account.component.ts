import { Component, ElementRef, input, InputSignal } from '@angular/core';
import { AuthService } from '../../../../shared/services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  imports: [RouterLink],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  constructor(private _CookieService:CookieService,private _AuthService:AuthService,private _Router:Router){}
  userName:InputSignal<string> =input('');
  userEmail!:string;
  imageUrl!:string;

  ngOnInit() {
    this.imageUrl = localStorage.getItem('URL')||'./images/1912-3.jpg';
    this.userEmail = localStorage.getItem('userEmail')!;
    
  }
  signOut(){
    this._CookieService.delete('token');
    this._AuthService.userInfo = null;
    this._Router.navigate(['/login']);
      localStorage.removeItem('userEmail');
    }

  log(e:Event){
    let url = e.target as HTMLInputElement;
    console.log(url.files);
      localStorage.setItem('URL',`./images/${url.files?.[0].name}`);
            this.imageUrl=localStorage.getItem('URL')!


    
  }
}
