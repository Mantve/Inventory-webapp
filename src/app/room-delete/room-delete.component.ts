import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.css']
})
export class RoomDeleteComponent implements OnInit {
  @Input() fromParent: any;
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private _activeModal: NgbActiveModal, private _roomService: RoomService) {
  }

  ngOnInit() {
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

  onSubmit(sendData: any) {
    this._roomService.delete(this.fromParent.roomNo).subscribe((res: any) => {
      this._roomService.sendRoomUpdateNotification();
      this.deleteEvent.emit("room-delete-success");
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.deleteEvent.emit("room-delete-fail");
      console.error(error)
    })
  }

}
