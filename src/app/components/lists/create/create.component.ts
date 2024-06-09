import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../services/list.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IList } from '../../../models/list';
import Swal from 'sweetalert2';
import { ListType } from '../../../models/type';
import { GroupsService } from '../../../services/groups.service';
import { IGroup } from '../../../models/group';
import { IItem } from '../../../models/item';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  list: IList = {} as IList;
  name: string = '';
  desc: string = '';
  selectedGroup: string = '';
  selectedType: string = '';
  groupList: IGroup[] = [];
  listTypes = [
    { name: 'Cuentas', value: ListType.accounting },
    { name: 'Eventos', value: ListType.event },
    { name: 'Notas', value: ListType.note },
    { name: 'Recordatorios', value: ListType.reminder },
    { name: 'Compras', value: ListType.shopping },
  ];

  constructor(
    private service: ListService,
    private groupService: GroupsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list.Items = [];
    this.groupService.getGroups().subscribe((data) => {
      this.groupList = data.msg;
    });
  }

  create() {
    if (
      this.selectedGroup == '' ||
      this.selectedType == '' ||
      this.name == ''
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'Complete todos los campos!',
        icon: 'error',
      });
      return;
    }
    this.list.Name = this.name;
    this.list.Desc = this.desc;
    this.list.GroupId = this.selectedGroup;
    this.list.Type = this.selectedType as ListType;
    transformLimitDate(this.list);
    console.log(this.list);
    this.service.createList(this.list).subscribe((data) => {
      if (data.msg == 'success') {
        Swal.fire({
          title: 'Exito!',
          text: 'La lista se creo correctamente!',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/']);
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Intente más tarde',
          icon: 'error',
        });
      }
    });
  }

  addItem() {
    this.list.Items.push({} as IItem);
  }

  removeItem(item: IItem) {
    this.list.Items.splice(this.list.Items.indexOf(item), 1);
  }
}

function transformLimitDate(list: IList): void {
  let user = JSON.parse(sessionStorage.getItem('user')!).msg.User as string;
  list.Items.forEach((item) => {
    item.CreatedBy = user;
    if (item.LimitDate != undefined) {
      item.LimitDate = new Date(item.LimitDate).toISOString();
    } else {
      item.LimitDate = new Date().toISOString();
    }
  });
}
