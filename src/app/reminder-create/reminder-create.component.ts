import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import { RepeatFrequency } from '../models/enums/repeatFrequency.model';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { ItemService } from '../services/item.service';
import { ReminderService } from '../services/reminder.service';
import { RoomService } from '../services/room.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.css']
})
export class ReminderCreateComponent implements OnInit {

  
  @Input() fromParent: any;
  @Output() createEvent = new EventEmitter<string>();
  selectedRoom!: number
  frequencies!:any
  form!: FormGroup;
  rooms!: Array<RoomResponseDto>;
  items!: Array<ItemResponseDto>;

  constructor(
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _itemService: ItemService,
    private _roomService: RoomService,
    private _reminderService: ReminderService
  ) {
    this.frequencies= RepeatFrequency;
    this.form = this._formBuilder.group({
      itemId: [, Validators.required],
      roomId: [, Validators.required],
      reminderTime: [Date.now, Validators.required],
      reason: [],
      repeatFrequency: [RepeatFrequency.None, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRooms();
    if (this.selectedRoom)
      this.loadItems(this.selectedRoom);
  }

  loadItems(roomNo: number) {
    this._itemService.getAll(roomNo).subscribe(
      res => {
        res.sort((a, b) => a.name.localeCompare(b.name));
        this.items = res;

      }, error => console.error(error))
  }

  loadRooms() {
    this._roomService.getAll().subscribe(
      res => {
        this.rooms = res;
      }, error => console.error(error))
  }

  onRoomChange() {
    console.log("room change")
    let select = document.querySelector("#roomId") as HTMLSelectElement;
    this.selectedRoom = Number(select.value);
    this.loadItems(this.selectedRoom);
  }

  onSubmit(sendData: any) {
    this._reminderService.create(this.form.value).subscribe((res: any) => {
      this.createEvent.emit("listItem-create-success");
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.createEvent.emit("listItem-create-fail");
      console.error(error)
    })
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

  openItemCreateModal() {
    const modalRef = this.modalService.open(ItemEditComponent, constants.ngbModalConfig);
    let data = {
      new:true
    }
    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadItems(this.selectedRoom);
    }, (reason) => {
    });
  }

  statusChangeEvent(state: string) {
    switch (state) {

      case "item-create-success":
        this.toastr.success('Item was created successfully', 'Success');
        break;

      case "item-create-fail":
        this.toastr.error('An error occurred while creating the item', 'Error');
        break;

      default:
    }
  }

}
