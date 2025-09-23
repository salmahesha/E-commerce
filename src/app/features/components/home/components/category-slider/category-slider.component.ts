import { Component } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { ICategory } from '../../../../../core/interfaces/icategory.interface';
@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent {
    constructor(private _CategoriesService:CategoriesService){}
    allCategories!:ICategory[];
    customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1,
    autoplayTimeout:500,
    navText: ['', ''],
    autoplaySpeed: true,
    autoplay:true,
    autoplayHoverPause:true,
    
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav:true
  }
  ngOnInit(): void {
      this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.allCategories=res.data;
          console.log(res.data);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }
}
