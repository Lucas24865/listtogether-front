import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { EventsShortComponent } from "../events-short/events-short.component";
import { ShoppingShortComponent } from "../shopping-short/shopping-short.component";
import { NotesShortComponent } from "../notes-short/notes-short.component";
import { AccountsShortComponent } from "../accounts-short/accounts-short.component";
import { RemindersShortComponent } from "../reminders-short/reminders-short.component";
import Masonry from 'masonry-layout';
import { TestServiceService } from '../../../services/test-service.service';
import { IList } from '../../../models/list';
import { ListType } from '../../../models/type';

@Component({
    selector: 'app-group-view',
    standalone: true,
    templateUrl: './group-view.component.html',
    styleUrl: './group-view.component.css',
    imports: [EventsShortComponent, ShoppingShortComponent, NotesShortComponent, AccountsShortComponent, RemindersShortComponent]
})
export class GroupViewComponent implements OnInit, AfterViewInit {
  enum: typeof ListType = ListType;
  lists: IList[] = []
  constructor(private elementRef: ElementRef, private testService: TestServiceService) {}
  ngOnInit(): void {
    this.lists = this.testService.getData();
  }
  
  ngAfterViewInit(): void {
    const grid = new Masonry(this.elementRef.nativeElement.querySelector('.row'), {
      // Opciones de Masonry si es necesario
      itemSelector: '.col-md-4', // Selector de los elementos de la mampostería
      // Otras opciones de configuración de Masonry si es necesario
    });
  }
}
