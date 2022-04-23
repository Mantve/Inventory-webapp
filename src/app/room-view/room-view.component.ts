import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { RoomService } from '../services/room.service';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from '../services/item.service';
import { RecursiveItemResponseDto } from '../models/response/recursiveItemResponseDto.model';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { constants } from '../_constants';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import { AuthenticationService } from '../services/authentication.service';
import { RoomShareComponent } from '../room-share/room-share.component';
import { CategoryService } from '../services/category.service';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit {

  roomNo!: number;
  room!: RoomResponseDto;
  items: Array<RecursiveItemResponseDto> = [];
  categories: Array<CategoryResponseDto> = [];
  username!: string

  constructor(
    private _roomService: RoomService,
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _itemService: ItemService,
    private _categoryService: CategoryService,
    private _authenticationService: AuthenticationService) {      
    }

  ngOnInit(): void {
    this._authenticationService.getUser().subscribe(
      res => {
        this.username = res.body?.username || "";
      }, error => console.error(error))

    this.route.params.subscribe(params => {
      this.roomNo = params['roomNo'];
      this.loadRoom(this.roomNo);
      this.loadItems(this.roomNo);
      this.loadCategoriesFromRoom(this.roomNo);
    });
  }

  loadItems(roomNo: number) {
    this._itemService.getAllRecursive(roomNo).subscribe(
      res => {
        this.items = res;
      }, error => console.error(error))
  }

  loadRoom(roomNo: number) {
    this._roomService.get(roomNo).subscribe(
      res => {
        this.room = res;
      }, error => console.error(error))
  }

  openRoomDeleteModal(roomNo: number, name: string) {
    const modalRef = this.modalService.open(DeletionConfirmationModalComponent,constants.ngbModalConfig);

    let data = {
      type: "room",
      name: name,
      successMessage: "room-delete-success",
      failMessage: "room-delete-fail",
      onSubmit:  (): Observable<object> => 
        this._roomService.delete(roomNo)
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
    }, (error) => {
    });
  }

  openRoomEditModal(roomNo: number) {
    const modalRef = this.modalService.open(RoomEditComponent,constants.ngbModalConfig);

    let data = {
      roomNo: roomNo
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadRoom(roomNo);
    }, (error) => {
    });
  }

  openItemCreateModal(roomNo: number) {
    const modalRef = this.modalService.open(ItemEditComponent,constants.ngbModalConfig);

      let data = {
        roomNo: roomNo,
        new:true
      }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadItems(this.roomNo);
      this.loadCategoriesFromRoom(this.roomNo);
    }, (reason) => {
    });
  }

  openRoomShareModal(roomNo: number) {
    const modalRef = this.modalService.open(RoomShareComponent,constants.ngbModalConfig);
    let data = {
      roomNo: roomNo
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((res) => {
      this.loadRoom(roomNo);
    }, (error) => {
      this.loadRoom(roomNo);
    });
  }

  loadCategoriesFromRoom(roomNo: number) {
    this._categoryService.getAllFromRoom(roomNo).subscribe(
      res => {
        this.categories = res;
      }, error => console.error(error))
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
