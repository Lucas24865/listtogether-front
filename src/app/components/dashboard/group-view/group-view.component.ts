import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { EventsShortComponent } from "../events-short/events-short.component";
import { ShoppingShortComponent } from "../shopping-short/shopping-short.component";
import { NotesShortComponent } from "../notes-short/notes-short.component";
import { AccountsShortComponent } from "../accounts-short/accounts-short.component";
import { RemindersShortComponent } from "../reminders-short/reminders-short.component";
import Masonry from 'masonry-layout';
import { IList } from '../../../models/list';
import { ListType } from '../../../models/type';
import { GraphsComponent } from "../graphs/graphs.component";
import { ListService } from '../../../services/list.service';

@Component({
    selector: 'app-group-view',
    standalone: true,
    templateUrl: './group-view.component.html',
    styleUrl: './group-view.component.css',
    imports: [EventsShortComponent, ShoppingShortComponent, NotesShortComponent, AccountsShortComponent, RemindersShortComponent, GraphsComponent]
})
export class GroupViewComponent implements OnInit, AfterViewInit {
  enum: typeof ListType = ListType;
  lists: IList[] = []
  constructor(private elementRef: ElementRef, private listService: ListService) {}
  ngOnInit(): void {
    this.lists = this.listService.getAll();
  }
  
  ngAfterViewInit(): void {
    const grid = new Masonry(this.elementRef.nativeElement.querySelector('.masonry'), {
      itemSelector: '.col-md-4', 
    });
  }
}
