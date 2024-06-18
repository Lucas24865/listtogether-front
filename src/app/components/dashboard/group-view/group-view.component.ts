import {Component, ElementRef, OnInit} from '@angular/core';
import {EventsShortComponent} from "../events-short/events-short.component";
import {ShoppingShortComponent} from "../shopping-short/shopping-short.component";
import {NotesShortComponent} from "../notes-short/notes-short.component";
import {AccountsShortComponent} from "../accounts-short/accounts-short.component";
import {RemindersShortComponent} from "../reminders-short/reminders-short.component";
import Swal from 'sweetalert2';
import {IListResponse} from '../../../models/list';
import {ListType} from '../../../models/type';
import {ListService} from '../../../services/list.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IGroup} from "../../../models/group";
import { ExcelService } from '../../../services/excel.service';
import {
  GroupNotificationComponent
} from "../../navbar/notification_types/group-notification/group-notification.component";
import {NgbDropdownItem} from "@ng-bootstrap/ng-bootstrap";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
    selector: 'app-group-view',
    standalone: true,
    templateUrl: './group-view.component.html',
    styleUrl: './group-view.component.css',
  imports: [EventsShortComponent, ShoppingShortComponent, NotesShortComponent, AccountsShortComponent, RemindersShortComponent, ReactiveFormsModule, FormsModule, GroupNotificationComponent, NgbDropdownItem]
})
export class GroupViewComponent implements OnInit {
  enum: typeof ListType = ListType;
  lists: IListResponse[] = []
  listsFiltered: IListResponse[] = []
  nameFilter: string = ""
  groups: IGroup[] = []
  groupFilter: string = ""
  typeFilter: ListType = ListType.null
  listTypeOptions = [
    { value: ListType.event, display: 'Eventos' },
    { value: ListType.shopping, display: 'Compras' },
    { value: ListType.accounting, display: 'Cuentas' },
    { value: ListType.note, display: 'Notas' },
    { value: ListType.reminder, display: 'Recordatorios' }
  ];

  constructor(private elementRef: ElementRef, private listService: ListService, private excelService: ExcelService) {}

  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        // @ts-ignore
        Swal.showLoading();
      }
    });
    this.listService.getAll().subscribe((data) => {
      this.lists = data.msg;
      this.listsFiltered = [...this.lists]
      this.getGroups();
      Swal.close();
    }, (error) => {
      console.error(error);
      // Manejar el error y cerrar el spinner de carga
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al cargar los datos',
      });
    });
    // const grid = new Masonry(this.elementRef.nativeElement.querySelector('.masonry'), {
    //   itemSelector: '.col-md-4',
    // });
  }

  exportToExcel(data: any): void {
    this.excelService.ExportToCsv(data.list, data.name);
  }

  getGroups(){
      const groupMap = new Map<string, IGroup>();
      this.lists.forEach(list => {
        if (!groupMap.has(list.Group.Id)) {
          groupMap.set(list.Group.Id, list.Group);
        }
      });
      this.groups = Array.from(groupMap.values());
  }

  filterLists() {
    this.listsFiltered = this.lists.filter(list => {
      return (this.nameFilter == "" || list.Name.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
          (this.groupFilter == "" || list.Group.Name === this.groupFilter) &&
          (this.typeFilter == ListType.null || list.Type === this.typeFilter)
    });
  }
  cleanFilters(){
    this.nameFilter = ""
    this.groupFilter = ""
    this.typeFilter = ListType.null
    this.filterLists()
  }

  protected readonly ListType = ListType;
}
