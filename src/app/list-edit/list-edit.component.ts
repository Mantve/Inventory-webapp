import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListResponseDto } from '../models/response/listResponseDto.model';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {
  @Input() fromParent: any;
  @Output() editEvent = new EventEmitter<string>();
  form!: FormGroup;
  list!: ListResponseDto;

  constructor(
    private _formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public _listService: ListService
  ) {
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