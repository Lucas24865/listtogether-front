import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import Masonry from 'masonry-layout';
import { IList } from '../../../models/list';
import { ListType } from '../../../models/type';
import {StatisticsViewComponent} from "../../statistics/statistics-view/statistics-view.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
  imports: [StatisticsViewComponent]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  enum: typeof ListType = ListType;
  lists: IList[] = []
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const grid = new Masonry(this.elementRef.nativeElement.querySelector('.masonry'), {
      itemSelector: '.col-md-4',
    });
  }
}
