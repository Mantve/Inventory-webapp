import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  @Input() fromParent: any;
  @Output() editEvent = new EventEmitter<string>();
  form!: FormGroup;
  rooms!: Array<RoomResponseDto>;
  items!: Array<ItemResponseDto>;
  savedItem!: ItemResponseDto;
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
      categoryId: ["2", Validators.required],
      parentItemId: [],
      comments: [""],
      roomId: [Validators.required]
    });
  }

  ngOnInit(): void {
    this._itemService.get(this.fromParent.itemNo).subscribe(result => {
      this.savedItem = result
      this.loadRooms();
      this.loadCategories();
      this.loadItems(result.room.id);
      this.form = this._formBuilder.group({
        name: [result.name, Validators.required],
        quantity: [result.quantity, Validators.required],
        value: [result.value, Validators.required],
        categoryId: [result.category?.id, Validators.required],
        parentItemId: [result.parentItem?.id],
        comments: [result.comments],
        roomId: [result.room.id, Validators.required]
      });
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
    this._itemService.update(this.fromParent.itemNo,this.form.value).subscribe((res: any) => {
      this.editEvent.emit("item-edit-success");
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.editEvent.emit("item-edit-fail");
      console.error(error)
    })
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

}
