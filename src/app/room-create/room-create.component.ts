import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {

  @Input() fromParent: any;
  @Output() createEvent = new EventEmitter<string>();
  form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _roomService: RoomService
  ) {
    this.form = this._formBuilder.group({
      name: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(sendData: any) {
    this._roomService.create(this.form.value).subscribe((res: any) => {
      this._roomService.sendRoomUpdateNotification();
      this.createEvent.emit("room-create-success");
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.createEvent.emit("room-create-fail");
      console.error(error)
    })
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

}
