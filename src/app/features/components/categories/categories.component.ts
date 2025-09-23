import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { ICategory } from '../../../core/interfaces/icategory.interface';
import { SubCategoriesService } from '../../../shared/services/SubCategory/sub-categories.service';
import { SubCategoryComponent } from "../Subcategries/sub-category.component";

@Component({
  selector: 'app-categories',
  imports: [SubCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoriesService: CategoriesService, private _SubCategoriesService: SubCategoriesService) { }
  allCategories!: ICategory[];
  subCategories!: ICategory[];
  specificCategoryId!: string | null;
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
        console.log(res.data);

      },
      error: (err) => {
        console.log(err);

      }
    });
  }
  getSubCategories(category_id: string) {
    this._SubCategoriesService.getAllSubCategoriesOnCategory(category_id).subscribe({
      next: (res) => {
        this.subCategories = res.data;
        console.log(res.data);

      }
    });
  }

}
