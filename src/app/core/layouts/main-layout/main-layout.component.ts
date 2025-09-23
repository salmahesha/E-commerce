import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarComponent, NgxSpinnerComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
