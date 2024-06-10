import { Component, ElementRef, OnInit } from '@angular/core';
import { IList } from '../../../models/list';
import { ListType } from '../../../models/type';
import {StatisticsViewComponent} from "../../statistics/statistics-view/statistics-view.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
  imports: [StatisticsViewComponent, FormsModule, ReactiveFormsModule]
})
export class DashboardComponent implements OnInit {
  enum: typeof ListType = ListType;
  lists: IList[] = []
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {

  }
}
