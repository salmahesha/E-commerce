import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { ICategory } from '../../../core/interfaces/icategory.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  imports: [RouterLink],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent {
  subCategories : InputSignal<ICategory[]>=input<ICategory[]>([]);

}
