import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { RecursiveItemResponseDto } from '../models/response/recursiveItemResponseDto.model';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  @Input() fromParent: any;
  @Output() createEvent = new EventEmitter<string>();
  form!: FormGroup;
  rooms!: Array<RoomResponseDto>;
  items!: Array<ItemResponseDto>;
  categories!: Array<CategoryResponseDto>

  constructor(
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _itemService: ItemService,
    private _roomService: RoomService,
    private _categoryService: CategoryService
  ) {
    this.form = this._formBuilder.group({
      name: ["", Validators.required],
      quantity: ["1", Validators.required],
      value: ["0", Validators.required],
      categoryId: [, Validators.required],
      parentItemId: [],
      comments: [""],
      roomId: [, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRooms();
    this.loadItems(this.fromParent.roomNo);
    this.loadCategories();
    this.form.patchValue({
      parentItemId: this.fromParent.itemNo,
      roomId: this.fromParent.roomNo
    })
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

  
  loadCategories() {
    this._categoryService.getAll().subscribe(
      res => {
        this.categories = res;
      }, error => console.error(error))
  }

  onRoomChange() {
    let select = document.querySelector("#roomId") as HTMLSelectElement;
    let roomNo = Number(select.value);
    this.loadItems(roomNo);
  }

  onSubmit(sendData: any) {
    this._itemService.create(this.form.value).subscribe((res: any) => {
      this.createEvent.emit("item-create-success");
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.createEvent.emit("item-create-fail");
      console.error(error)
    })
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

}
