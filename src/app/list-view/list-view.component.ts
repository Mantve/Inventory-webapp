import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { ListItemCreateComponent } from '../list-item-create/list-item-create.component';
import { ListItemUpdateDto } from '../models/request/listItemUpdateDto.model';
import { ListItemResponseDto } from '../models/response/listItemResponseDto.model';
import { ListResponseDto } from '../models/response/listResponseDto.model';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { ListItemService } from '../services/list-item.service';
import { ListService } from '../services/list.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {


  listNo!: number;
  list!: ListResponseDto;

  constructor(
    private _listItemService: ListItemService,
    private _listService: ListService,
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listNo = params['listNo'];
      this.loadList(this.listNo);
    });
  }

  loadList(listNo: number) {
    this._listService.get(listNo).subscribe(
      res => {
        this.list = res;
      }, error => console.error(error))
  }

  openListItemDeleteModal(listNo: number, name: string) {
    const modalRef = this.modalService.open(DeletionConfirmationModalComponent, constants.ngbModalConfig);

    let data = {
      type: "listItem",
      name: name,
      successMessage: "listItem-delete-success",
      failMessage: "listItem-delete-fail",
      onSubmit: (): Observable<object> =>
        this._listItemService.delete(listNo)
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
    }, (error) => {
    });
  }

  openListItemCreateModal(listNo: number) {
    const modalRef = this.modalService.open(ListItemCreateComponent, constants.ngbModalConfig);

    let data = {
      listNo: listNo
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.createEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadList(this.listNo);
    }, (reason) => {
    });
  }

  listItemChecked(listItemId: number, event: any) {

    let dto = {
      completed: event.target.checked
    }
    this._listItemService.update(listItemId, dto).subscribe(
      res => {
      }, (error) => {
        console.error(error);
        this.loadList(this.listNo)
      })
  }

  statusChangeEvent(state: string) {
    switch (state) {

      case "room-delete-success":
        this.toastr.success('Room has been deleted successfully', 'Success');
        this._router.navigate([this.route.parent]);
        break;

      case "room-delete-fail":
        this.toastr.error('An error occurred while deleting the room', 'Error');
        break;

      case "item-create-success":
        this.toastr.success('Item was created successfully', 'Success');
        break;

      case "item-create-fail":
        this.toastr.error('An error occurred while creating the item', 'Error');
        break;

      case "room-edit-success":
        this.toastr.success('Room was modified successfully', 'Success');
        break;

      case "room-edit-fail":
        this.toastr.error('An error occurred while saving changes', 'Error');
        break;
      default:
    }
  }
}
