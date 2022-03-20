import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
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
    public activeModal: NgbActiveModal,
    public _roomService: RoomService
  ) {
    this.form = this._formBuilder.group({
      id: [0, Validators.required],
      name: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this._roomService.get(this.fromParent.roomNo).subscribe(result => {
      this.room = result
      this.form = this._formBuilder.group({
        id: [result.id, Validators.required],
        name: [result.name, Validators.required]
      });
    })
  }

  onSubmit(sendData: any) {
    this._roomService.update(this.fromParent.roomNo, this.form.value).subscribe((res: any) => {
      this.editEvent.emit("room-edit-success");
      this.activeModal.close(sendData);
    }, (error: any) => {
      this.editEvent.emit("room-edit-fail");
      console.error(error)
    })
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
