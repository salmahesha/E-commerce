import { Component, input, InputSignal, signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../services/Cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    constructor(private _CartService:CartService, private _CookieService:CookieService,private _Router:Router,private _AuthService:AuthService,private flowbiteService: FlowbiteService ) {}
  userName!:string;
  numberOfItems!:number;
  check : InputSignal<boolean> = input(false);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if(this._CookieService.get('token')){
      this._AuthService.decodeToken();
      this.userName = this._AuthService.userInfo.name;
    };
    this._CartService.cartCount.subscribe({
      next:(value)=> {
          this.numberOfItems = value;
      },
    })
    if(this._CookieService.get('token')){

      this._CartService.getLogUserCart().subscribe({
        next:(res)=>{
          this.numberOfItems = res.numOfCartItems;
        }
      })
    }
  }
  signOut(){
    this._CookieService.delete('token');
    this._AuthService.userInfo = null;
    this._Router.navigate(['/login']);
    this.userName = '';
    }
  // changeNumber(){
  //   this.numberOfItems.update((newNumber)=>{return newNumber++})
  // }
  

}