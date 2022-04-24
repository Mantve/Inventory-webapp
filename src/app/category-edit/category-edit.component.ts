import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { CategoryService } from '../services/category.service';
import { ValidatedForm } from '../validators/validatedForm';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent extends ValidatedForm implements OnInit {

  @Input() fromParent: any;
  @Output() editEvent = new EventEmitter<string>();
  savedCategory!: CategoryResponseDto;

  constructor(
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _categoryService: CategoryService) {
    super();
    this.form = this._formBuilder.group({
      id: [0, [Validators.required]],
      name: ["", [Validators.required, Validators.maxLength(30)]],
      description: ["", [ Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    if (!this.fromParent.new) {

      this._categoryService.get(this.fromParent.categoryNo).subscribe(result => {
        this.savedCategory = result
        this.form = this._formBuilder.group({
          id: [result.id, [Validators.required]],
          name: [result.name, [Validators.required, Validators.maxLength(30)]],
          description: [result.description, [ Validators.maxLength(100)]]
        });
      })
    }

  }

  onSubmit(sendData: any) {
    if (!this.fromParent.new) {

      this._categoryService.update(this.fromParent.categoryNo, this.form.value).subscribe((res: any) => {
        this.editEvent.emit("category-edit-success");
        this._activeModal.close(sendData);
      }, (error: any) => {
        this.editEvent.emit("category-edit-fail");
        console.error(error)
      })
    }
    else {
      this._categoryService.create(this.form.value).subscribe((res: any) => {
        this.editEvent.emit("category-create-success");
        this._activeModal.close(sendData);
      }, (error: any) => {
        this.editEvent.emit("category-create-fail");
        console.error(error)
      })
    }
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

}
