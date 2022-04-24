import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { GenericModal } from '../genericModal';
import { ListCreateComponent } from '../list-create/list-create.component';
import { ListEditComponent } from '../list-edit/list-edit.component';
import { ListResponseDto } from '../models/response/listResponseDto.model';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { ListService } from '../services/list.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.scss']
})
export class ListListComponent implements OnInit {

  lists!: Array<ListResponseDto>;

  constructor(
    private _genericModal: GenericModal,
    private _listService: ListService,
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    this.loadLists();

  }

  loadLists() {
    this._listService.getAll().subscribe(
      res => {
        this.lists = res;
      }, error => console.error(error))
  }

  openListDeleteModal(listNo: number, name: string) {

    let data = {
      type: "list",
      name: name,
      successMessage: "list-delete-success",
      failMessage: "list-delete-fail",
      onSubmit: (): Observable<object> =>
        this._listService.delete(listNo)
    }
    this._genericModal.openModal(DeletionConfirmationModalComponent, data, () => { this.loadLists() }, () => { });

  }

  openListEditModal(listNo: number) {
    let data = {
      listNo: listNo
    }
    this._genericModal.openModal(ListEditComponent, data, () => { this.loadLists() }, () => { });

  }

  openListCreateModal() {
    this._genericModal.openModal(ListCreateComponent, {}, () => { this.loadLists() }, () => { });
  }

}
