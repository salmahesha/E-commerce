import { Component, signal } from '@angular/core';
import { BrandService } from '../../../shared/services/Brands/brand.service';
import { Daum} from '../../../core/interfaces/ibrands.interface';
import { FlowbiteService } from './../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  constructor(private _BrandService:BrandService,private _FlowbiteService:FlowbiteService){}
  allBrands!: Daum[];
  pageNumber:Number = 1;
  ngOnInit() {
     this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this._BrandService.getAllBrands(1)
    
    .subscribe({
      next:(res)=>{
       this.allBrands = res.data
        console.log(res);
        
        
      }
    });
  }


  changePage(page:Number){
    this.pageNumber = page
    this._BrandService.getAllBrands(page)
    
    
    
    .subscribe({
      next:(res)=>{
       this.allBrands = res.data

        console.log(res);
        
      }
    });
  }
}
