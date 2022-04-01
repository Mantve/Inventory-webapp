import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { ListCreateComponent } from '../list-create/list-create.component';
import { ListEditComponent } from '../list-edit/list-edit.component';
import { ListResponseDto } from '../models/response/listResponseDto.model';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { ListService } from '../services/list.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.css']
})
export class ListListComponent implements OnInit {

  lists!: Array<ListResponseDto>;

  constructor(
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
    const modalRef = this.modalService.open(DeletionConfirmationModalComponent,constants.ngbModalConfig);

    let data = {
      type: "list",
      name: name,
      successMessage: "list-delete-success",
      failMessage: "list-delete-fail",
      onSubmit:  (): Observable<object> => 
        this._listService.delete(listNo)
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadLists();
    }, (error) => {
    });
  }

  openListEditModal(listNo: number) {
    const modalRef = this.modalService.open(ListEditComponent,constants.ngbModalConfig);

    let data = {
      listNo: listNo
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadLists();
    }, (error) => {
    });
  }

  openListCreateModal() {
    const modalRef = this.modalService.open(ListCreateComponent,constants.ngbModalConfig);

    modalRef.componentInstance.createEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadLists();
    }, (reason) => {
    });
  }

  getRandomNumber() {
    return  Math.floor(Math.random() *10) ;
  }

  statusChangeEvent(state: string) {
    switch (state) {

      case "list-delete-success":
        this.toastr.success('List has been deleted successfully', 'Success');
        this._router.navigate([this.route.parent]);
        break;

      case "list-delete-fail":
        this.toastr.error('An error occurred while deleting the list', 'Error');
        break;

      case "list-create-success":
        this.toastr.success('List was created successfully', 'Success');
        break;

      case "list-create-fail":
        this.toastr.error('An error occurred while creating the list', 'Error');
        break;

        case "list-edit-success":
          this.toastr.success('List was modified successfully', 'Success');
          break;
  
        case "list-edit-fail":
          this.toastr.error('An error occurred while saving changes', 'Error');
          break;
      default:
    }
  }
}
