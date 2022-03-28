import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { UserResponseDto } from '../models/response/userResponseDto.model';
import { AuthenticationService } from '../services/authentication.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input() fromParent: any;
  @Output() editEvent = new EventEmitter<string>();
  form!: FormGroup;
  room!: RoomResponseDto;

  constructor(
    private _formBuilder: FormBuilder,
    public _activeModal: NgbActiveModal,
    public _roomService: RoomService  ) {
      
    this.form = this._formBuilder.group({
      name: ["", Validators.required],
      sharedWith: []
    });
  }

  ngOnInit(): void {
    if (!this.fromParent.new) {
      this._roomService.get(this.fromParent.roomNo).subscribe(result => {
        this.room = result
        this.form = this._formBuilder.group({
          name: [result.name, Validators.required]
        });
      })
    }
  }

  onSubmit(sendData: any) {
    if (!this.fromParent.new) {

      this._roomService.update(this.fromParent.roomNo, this.form.value).subscribe((res: any) => {
        this.editEvent.emit("room-edit-success");
        this._activeModal.close(sendData);
      }, (error: any) => {
        this.editEvent.emit("room-edit-fail");
        console.error(error)
      })
    }
    else {
      this._roomService.create(this.form.value).subscribe((res: any) => {
        this._roomService.sendRoomUpdateNotification();
        this.editEvent.emit("room-create-success");
        this._activeModal.close(sendData);
      }, (error: any) => {
        this.editEvent.emit("room-create-fail");
        console.error(error)
      })
    }
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

}
