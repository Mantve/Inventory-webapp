import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { RoomService } from '../services/room.service';
import { constants } from '../_constants';

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
  categories!: Array<CategoryResponseDto>
  savedItem!: ItemResponseDto;

  constructor(
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
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
    if (!this.fromParent.new) {
      this._itemService.get(this.fromParent.itemNo).subscribe(result => {
        this.savedItem = result
        this.loadRooms();
        this.loadCategories(result.room.id);
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
    else {
      this.loadRooms();
      this.loadCategories(this.fromParent.roomNo);
      this.loadItems(this.fromParent.roomNo);
      this.form.patchValue({
        parentItemId: this.fromParent.itemNo,
      })
      if (this.fromParent.roomNo) {
        console.log(this.fromParent.roomNo)
        this.form.patchValue({
          roomId: this.fromParent.roomNo
        })
      }
    }

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
    console.log("room changed"+roomNo);
  }

  onSubmit(sendData: any) {
    if (!this.fromParent.new) {
      this._itemService.update(this.fromParent.itemNo, this.form.value).subscribe((res: any) => {
        this.editEvent.emit("item-edit-success");
        this._activeModal.close(sendData);
      }, (error: any) => {
        this.editEvent.emit("item-edit-fail");
        console.error(error)
      })
    }
    else {
      this._itemService.create(this.form.value).subscribe((res: any) => {
        this.editEvent.emit("item-create-success");
        this._activeModal.close(sendData);
      }, (error: any) => {
        this.editEvent.emit("item-create-fail");
        console.error(error)
      })
    }
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

  openCategoryCreateModal() {
    const modalRef = this.modalService.open(CategoryCreateComponent, constants.ngbModalConfig);
    modalRef.componentInstance.createEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadCategories();
    }, (reason) => {
    });
  }

  statusChangeEvent(state: string) {
    switch (state) {

      case "category-create-success":
        this.toastr.success('Category was created successfully', 'Success');
        break;

      case "category-create-fail":
        this.toastr.error('An error occurred while creating the category', 'Error');
        break;

      default:
    }
  }

}
