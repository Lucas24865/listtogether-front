import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IList, IListResponse } from '../../../models/list';
import { IItem, IItemResponse } from '../../../models/item';
import { ListService } from '../../../services/list.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../models/user';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  list: IListResponse = {} as IListResponse;

  constructor(
    private service: ListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.service.get(params['id']).subscribe((data) => {
        this.list = data.msg;
        transformLimitDateToLocal(this.list);
      });
    });
  }

  addItem() {
    this.list.Items.push({} as IItemResponse);
  }

  removeItem(item: IItemResponse) {
    this.list.Items.splice(this.list.Items.indexOf(item), 1);
  }

  delete() {
    this.service.deleteList(this.list.Id).subscribe((data) => {
      if (data.msg == 'success') {
        Swal.fire({
          title: 'Exito!',
          text: 'La lista se borró correctamente!',
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

  update() {
    console.log(this.list);
    var listTransformed = ListResponseToList(this.list);
    console.log(listTransformed);
    this.service.updateList(listTransformed).subscribe((data) => {
      if (data.msg == 'success') {
        Swal.fire({
          title: 'Exito!',
          text: 'La lista se editó correctamente!',
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
}

function transformLimitDateToLocal(list: IListResponse): void {
  list.Items.forEach((item) => {
    if (item.LimitDate != undefined) {
      const limitDate = new Date(item.LimitDate);

      const year = limitDate.getFullYear();
      const month = String(limitDate.getMonth() + 1).padStart(2, '0'); // Mes comienza desde 0
      const day = String(limitDate.getDate()).padStart(2, '0');
      const hours = String(limitDate.getHours()).padStart(2, '0');
      const minutes = String(limitDate.getMinutes()).padStart(2, '0');

      item.LimitDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
  });
}

function transformLimitDateToSend(list: IListResponse): void {
  list.Items.forEach((item) => {
    console.log(item.LimitDate);
    if (item.LimitDate != undefined) {
      item.LimitDate = new Date(item.LimitDate).toISOString();
    } else {
      item.LimitDate = new Date().toISOString();
    }
    if (item.CreatedAt == undefined) {
      item.CreatedAt = new Date().toISOString();
    }
  });
}

function ListResponseToList(list: IListResponse): IList {
  transformLimitDateToSend(list);

  var listTransformed: IList = {
    Id: list.Id,
    Name: list.Name,
    Desc: list.Desc,
    GroupId: list.Group.Id,
    Items: [] as IItem[],
    Type: list.Type,
    CreatedAt: list.CreatedAt,
    CreatedBy: list.CreatedBy.User,
  };

  list.Items.forEach((item) => {
    let user = JSON.parse(sessionStorage.getItem('user')!).msg.User as string;

    if (item.CreatedBy == undefined) {
      item.CreatedBy = { User: user } as IUser;
    }

    if (item.CompletedBy == undefined) {
      item.CompletedBy = { User: '' } as IUser;
    }

    listTransformed.Items.push({
      Id: item.Id,
      Name: item.Name,
      Quantity: item.Quantity,
      Desc: item.Desc,
      Completed: item.Completed,
      CreatedAt: item.CreatedAt,
      CreatedBy: item.CreatedBy.User,
      LimitDate: item.LimitDate,
      CompletedBy: item.CompletedBy.User,
    });
  });

  return listTransformed;
}
