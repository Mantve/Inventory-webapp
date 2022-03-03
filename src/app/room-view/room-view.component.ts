import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { RoomDeleteComponent } from '../room-delete/room-delete.component';
import { RoomService } from '../services/room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent implements OnInit {

  roomNo!: number;
  room!: RoomResponseDto;

  constructor(private _roomService: RoomService, private _router: Router, private route: ActivatedRoute, private modalService: NgbModal, private toastr: ToastrService, ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomNo = params['roomNo'];
      this.loadRoom(this.roomNo);
    });
  }

  loadRoom(roomNo: number) {
    this._roomService.get(roomNo).subscribe(
      res => {
        this.room = res;
      },error => console.error(error))
  }

  openDeleteModal(roomNo: number, name: string) {
    const modalRef = this.modalService.open(RoomDeleteComponent,
      {
        scrollable: true,
        //windowClass: 'myCustomModalClass',
        centered: true
        // keyboard: false,
        // backdrop: 'static'
      });

    let data = {
      roomNo: roomNo,
      name: name
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
    }, (error) => {
    });
  }



  statusChangeEvent(state: string) {
    switch (state) {

      case "room-delete-success":
        this.toastr.success('Room has been deleted successfully', 'Success');
        this._router.navigate([this.route.parent]);
        break;

      case "room-delete-fail":
        this.toastr.error('An error occurred when deleting the room', 'Error');
        break;


      default:
    }
  }
}
