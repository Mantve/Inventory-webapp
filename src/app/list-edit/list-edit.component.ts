import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListResponseDto } from '../models/response/listResponseDto.model';
import { ListService } from '../services/list.service';
import { ValidatedForm } from '../validators/validatedForm';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent extends ValidatedForm implements OnInit {
  @Input() fromParent: any;
  @Output() modalEvent = new EventEmitter<string>();
  list!: ListResponseDto;

  constructor(
    private _formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public _listService: ListService
  ) {
    super();
    this.form = this._formBuilder.group({
      id: [0, Validators.required],
      name: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this._listService.get(this.fromParent.listNo).subscribe(result => {
      this.list = result
      this.form = this._formBuilder.group({
        id: [result.id, Validators.required],
        name: [result.name, Validators.required]
      });
    })
  }

  onSubmit(sendData: any) {
    this._listService.update(this.fromParent.listNo, this.form.value).subscribe((res: any) => {
      this.modalEvent.emit("room-edit-success");
      this.activeModal.close(sendData);
    }, (error: any) => {
      this.modalEvent.emit("room-edit-fail");
      console.error(error)
    })
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}