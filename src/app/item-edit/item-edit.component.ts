import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { GenericModal } from '../genericModal';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { RoomService } from '../services/room.service';
import { ValidatedForm } from '../validators/validatedForm';
import { constants } from '../_constants';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent extends ValidatedForm implements OnInit {

  @Input() fromParent: any;
  @Output() modalEvent = new EventEmitter<string>();
  rooms!: Array<RoomResponseDto>;
  items!: Array<ItemResponseDto>;
  childrenItems!: Array<ItemResponseDto>;
  categories!: Array<CategoryResponseDto>
  savedItem!: ItemResponseDto;

  constructor(
    private _genericModal: GenericModal,
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _itemService: ItemService,
    private _roomService: RoomService,
    private _categoryService: CategoryService
  ) {
    super();
    this.form = this._formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      quantity: ["1", [Validators.required,Validators.min(0),Validators.max(9999999)]],
      value: ["0", [Validators.required,Validators.min(0),Validators.max(9999999)]],
      categoryId: [, Validators.required],
      parentItemId: [],
      comments: ["",[Validators.maxLength(200)]],
      roomId: [, Validators.required]
    });
  }
  
  ngOnInit(): void {
    if (!this.fromParent.new) {
      this._itemService.get(this.fromParent.itemNo).subscribe(result => {
        this.savedItem = result
        this.loadRooms();
        this.loadCategories(result.room.id);
        this.loadItems(result.room.id,this.fromParent.itemNo);
        this.form = this._formBuilder.group({
          name: [result.name, [Validators.required, Validators.maxLength(50)]],
          quantity: [result.quantity, [Validators.required,Validators.min(0),Validators.max(9999999)]],
          value: [result.value, [Validators.required,Validators.min(0),Validators.max(9999999)]],
          categoryId: [result.category?.id, Validators.required],
          parentItemId: [result.parentItem?.id],
          comments: [result.comments,[Validators.maxLength(200)]],
          roomId: [result.room.id, Validators.required]
        });
      })
    }
    else {
      this.loadRooms();
      this.loadCategories(this.fromParent.roomNo);
      this.loadItems(this.fromParent.roomNo);
      this.form.patchValue({
        parentItemId: this.fromParent.itemNo,
      })
      if (this.fromParent.roomNo) {
        this.form.patchValue({
          roomId: this.fromParent.roomNo
        })
      }
    }

  }

  loadItems(roomNo: number, itemNo?: number) {
    this._itemService.getAllRoom(roomNo).subscribe(
      res => {
        res.sort((a, b) => a.name.localeCompare(b.name));
        this.items = res;
        this.loadChildrenItems(itemNo);
      }, error => console.error(error))
  }

  loadChildrenItems(itemNo?: number) {
    if (itemNo) {
    this._itemService.getAll(itemNo).subscribe(
      res => {
        res.sort((a, b) => a.name.localeCompare(b.name));
        this.childrenItems = this.items.filter(x => !res.some(y => y.id === x.id));
      }, error => console.error(error))
    }
    else {
      this.childrenItems = this.items;
    }
  }

  loadRooms() {
    this._roomService.getAll().subscribe(
      res => {
        this.rooms = res;
      }, error => console.error(error))
  }

  loadCategories(roomNo?: number) {
    this._categoryService.getAll().subscribe(
      res => {
        if (roomNo) {
          this.loadCategoriesFromRoom(roomNo, res);
        }

        this.categories = res;
      }, error => console.error(error))
  }

  loadCategoriesFromRoom(roomNo: number, categories: Array<CategoryResponseDto>) {
    this._categoryService.getAllFromRoom(roomNo).subscribe(
      res => {
        res.forEach(category => {
          if (!categories.some(c => c.id === category.id)) {
            categories.push(category);
          }
        });
      
        this.categories = categories;
      }, error => console.error(error))
  }

  onRoomChange() {
    let select = document.querySelector("#roomId") as HTMLSelectElement;
    let roomNo = Number(select.value);
    this.loadItems(roomNo);
    this.loadCategories(roomNo);
  }

  onSubmit(sendData: any) {
    if (!this.fromParent.new) {
      this._itemService.update(this.fromParent.itemNo, this.form.value).subscribe((res: any) => {
        this.modalEvent.emit("item-edit-success");
        this._activeModal.close(sendData);
      }, (error: any) => {
        this.modalEvent.emit("item-edit-fail");
        console.error(error)
      })
    }
    else {
      this._itemService.create(this.form.value).subscribe((res: any) => {
        this.modalEvent.emit("item-create-success");
        this._activeModal.close(sendData);
      }, (error: any) => {
        this.modalEvent.emit("item-create-fail");
        console.error(error)
      })
    }
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

  openCategoryCreateModal() {
    this._genericModal.openModal(CategoryEditComponent, { new: true}, () => { this.loadCategories() }, () => { });
  }

  openCreateRoomModal() {
    this._genericModal.openModal(RoomEditComponent, { new: true}, () => { this.loadRooms() }, () => { });
  }
  

}
