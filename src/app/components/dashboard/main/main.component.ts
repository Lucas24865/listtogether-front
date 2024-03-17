import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { GroupViewComponent } from "../group-view/group-view.component";
import { TypeViewComponent } from "../type-view/type-view.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [NavbarComponent, GroupViewComponent, TypeViewComponent]
})
export class MainComponent implements OnInit{
  isViewGroup : boolean = true;
  ngOnInit(): void {
    this.isViewGroup = true;
  }
  changeView() {
    this.isViewGroup = !this.isViewGroup
    console.log(this.isViewGroup)
  }

}
