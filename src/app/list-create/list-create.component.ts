import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.scss']
})
export class ListCreateComponent  {
  @Input() fromParent: any;
  @Output() createEvent = new EventEmitter<string>();
  form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _listService: ListService
  ) {
    this.form = this._formBuilder.group({
      name: ["", Validators.required]
    });
  }

  onSubmit(sendData: any) {
    this._listService.create(this.form.value).subscribe((res: any) => {
      this.createEvent.emit("list-create-success");
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.createEvent.emit("list-create-fail");
      console.error(error)
    })
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }
}