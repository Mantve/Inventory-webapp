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
import { GenericModal } from '../genericModal';

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
    private _genericModal: GenericModal,
    private _roomService: RoomService,
    private _router: Router,
    private route: ActivatedRoute,
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
    let data = {
      type: "room",
      name: name,
      successMessage: "room-delete-success",
      failMessage: "room-delete-fail",
      onSubmit:  (): Observable<object> => 
        this._roomService.delete(roomNo)
    }

    this._genericModal.openModal(DeletionConfirmationModalComponent, data, () => { this._router.navigate([this.route.parent]);}, () => { });
  }

  openRoomEditModal(roomNo: number) {
    this._genericModal.openModal(RoomEditComponent, {roomNo: roomNo}, () => { this.loadRoom(roomNo) }, () => { });
  }

  openItemCreateModal(roomNo: number) {

    let data = {
      roomNo: roomNo,
      new:true
    }

    this._genericModal.openModal(ItemEditComponent, data, () => {
       this.loadItems(this.roomNo);
      this.loadCategoriesFromRoom(this.roomNo);
    }, () => { });
  }

  openRoomShareModal(roomNo: number) {
    this._genericModal.openModal(RoomShareComponent, {roomNo: roomNo}, () => { this.loadRoom(roomNo) }, () => { this.loadRoom(roomNo) });
  }

  loadCategoriesFromRoom(roomNo: number) {
    this._categoryService.getAllFromRoom(roomNo).subscribe(
      res => {
        this.categories = res;
      }, error => console.error(error))
  }

  
}
