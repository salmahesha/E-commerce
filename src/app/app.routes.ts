import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/components/home/home.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { CartComponent } from './features/components/cart/cart.component';
import { ProductsComponent } from './features/components/products/products.component';
import { authGuard } from './core/guards/auth-guard';
import { ForgotPassComponent } from './core/components/login/components/forgot-pass/forgot-pass.component';
import { AllOrdersComponent } from './features/components/all-orders/all-orders.component';
import { CheckOutComponent } from './features/components/check-out/check-out.component';
import { NewPasswordComponent } from './core/components/login/components/NewPassword/new-password/new-password.component';
import { ResetCodeComponent } from './core/components/login/components/ResetCode/reset-code/reset-code.component';
import { WishListComponent } from './features/components/Whishlist/wish-list/wish-list.component';
import { BrandDetailsComponent } from './features/components/brands/componrnts/BrandDetails/brand-details/brand-details.component';
import { SubCategoryProductsComponent } from './features/components/Subcategries/components/SubCategoryProducts/sub-category-products/sub-category-products.component';
import { MyAccountComponent } from './features/components/MyAccount/my-account/my-account.component';
import { EditProfileComponent } from './features/components/MyAccount/my-account/components/Eedit-profile/edit-profile/edit-profile.component';
import { UpdatePasswordComponent } from './features/components/MyAccount/my-account/components/update-passwprd/update-password/update-password.component';

export const routes: Routes = [

    {path:'' , redirectTo:'/login' , pathMatch:'full'},

    {path:'' , component:AuthLayoutComponent , children:[
        {path: 'login' , component:LoginComponent , title:'Login'},
        {path: 'register' , component:RegisterComponent , title:'Register'},
        {path:'forgotPass',component:ForgotPassComponent,title:'forgotPassword'},
        {path:'newPassword',component:NewPasswordComponent,title:'newPassword'},
        {path:'resetCode',component:ResetCodeComponent,title:'resetCode'},


    ]},

    {path:'' , component:MainLayoutComponent ,canActivate:[authGuard] , children:[
        {path:'home' , component:HomeComponent , title:'Home'},
        {path:'brands' , component:BrandsComponent , title:'Brands'},
        {path:'categories' , component:CategoriesComponent , title:'Categories'},
        {path:'cart' , component:CartComponent , title:'Cart'},
        {path:'myAccount' , component:MyAccountComponent , title:'MyAccount'},
        {path:'edit-profile' , component:EditProfileComponent , title:'Edit Profile'},
        {path:'updatePassword' , component:UpdatePasswordComponent , title:'Update Password'},
        {path:'wishList' , component:WishListComponent , title:'wishlist'},
        {path:'products' , component:ProductsComponent , title:'Products'},
        {path:'allorders' , component:AllOrdersComponent , title:'Orders'},
        {path:'subCategoryProducts/:c_id' , component:SubCategoryProductsComponent , title:'products'},
        {path:'checkOut/:c_id' , component:CheckOutComponent , title:'checkout'},
        {path:'brand-products/:b_id/:b_name' , component:BrandDetailsComponent , title:'Products of brand'},
        {path:'p-details/:p_id',loadComponent:()=>import('./features/components/p-details/p-details.component').then((c)=>c.PDetailsComponent)},
    ]},
    {path:"**" , component:NotfoundComponent , title:'404'}

];
