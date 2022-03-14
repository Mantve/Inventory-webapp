import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  @Input() fromParent: any;
  @Output() createEvent = new EventEmitter<string>();
  form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _itemService: ItemService
  ) {
    this.form = this._formBuilder.group({
      name: ["", Validators.required],
      quantity: ["1", Validators.required],
      value: ["0", Validators.required],
      categoryId: ["2", Validators.required],
      parentItemId: ["2006", Validators.required],
      comments: ["", Validators.required],
      roomId: ["3002", Validators.required]
    });
  }

  ngOnInit(): void {
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
