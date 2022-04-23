import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { RoomService } from '../services/room.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  rooms: Array<RoomResponseDto> = [];
  constructor(
    private _roomService: RoomService,
    private _router: Router,
    private route: ActivatedRoute,
    private _toastr: ToastrService,
    private modalService: NgbModal) {
    this._roomService.roomChanged
      .subscribe(res => {
        this.getRooms();
      });
  }

  ngOnInit(): void {
    this.getRooms();
  }

  openRoomEditModal(roomNo: number) {
    const modalRef = this.modalService.open(RoomEditComponent, constants.ngbModalConfig);

    let data = {
      roomNo: roomNo
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.getRooms();
    }, (error) => {
    });
  }

  openRoomDeleteModal(roomNo: number, name: string) {
    const modalRef = this.modalService.open(DeletionConfirmationModalComponent, constants.ngbModalConfig);

    let data = {
      type: "room",
      name: name,
      successMessage: "room-delete-success",
      failMessage: "room-delete-fail",
      onSubmit: (): Observable<object> =>
        this._roomService.delete(roomNo)
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.getRooms();
    }, (error) => {
    });
  }

  public getRooms() {
    this._roomService.getAll().subscribe(
      res => {
        this.rooms = res;
      });
  }

  statusChangeEvent(state: string) {
    switch (state) {

      case "room-delete-success":
        this._toastr.success('Room has been deleted successfully', 'Success');
        break;

      case "room-delete-fail":
        this._toastr.error('An error occurred while deleting the room', 'Error');
        break;

        case "room-edit-success":
          this._toastr.success('Room was modified successfully', 'Success');
          break;
  
        case "room-edit-fail":
          this._toastr.error('An error occurred while saving changes', 'Error');
          break;
      default:
    }
  }
}
