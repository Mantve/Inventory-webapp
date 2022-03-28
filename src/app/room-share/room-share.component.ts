import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { UserResponseDto } from '../models/response/userResponseDto.model';
import { AuthenticationService } from '../services/authentication.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-share',
  templateUrl: './room-share.component.html',
  styleUrls: ['./room-share.component.css']
})
export class RoomShareComponent implements OnInit {

  @Input() fromParent: any;
  room!: RoomResponseDto;
  friends!: Array<UserResponseDto>;

  constructor(
    public _activeModal: NgbActiveModal,
    public _roomService: RoomService ,
    public _authenticationService: AuthenticationService ) {
  }

  ngOnInit(): void {
    this.loadRoom(this.fromParent.roomNo)
    this.loadFriends();
  }

  isSharedWith( username: string)
  {
      return this.room.sharedWith.some(x=> x.username === username);
  }

  loadFriends() {
    this._authenticationService.getFriends().subscribe(
      res => {
        this.friends = res;
      }, error => console.error(error))
  }

  loadRoom(roomId: number) {
    this._roomService.get(roomId).subscribe(
      res => {
        this.room = res;
      }, error => console.error(error))
  }


  listItemChecked(roomNo:number, username: string, event: any) {

    let dto = {
      shared: event.target.checked,
      username:username
    }
    this._roomService.share(roomNo, dto).subscribe(
      res => {
      }, (error) => {
        console.error(error);
      })
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

}
