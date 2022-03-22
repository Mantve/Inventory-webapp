import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  @Input() fromParent: any;
  @Output() createEvent = new EventEmitter<string>();
  form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _categoryService: CategoryService) {
    this.form = this._formBuilder.group({
      name: ["", Validators.required],
      description: [""]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(sendData: any) {
    this._categoryService.create(this.form.value).subscribe((res: any) => {
      this.createEvent.emit("category-create-success");
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.createEvent.emit("category-create-fail");
      console.error(error)
    })
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

}
