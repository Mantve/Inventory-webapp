import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { GenericModal } from '../genericModal';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { CategoryService } from '../services/category.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {

  categories!: Array<CategoryResponseDto>;

  constructor(
    private _genericModal: GenericModal,
    private _router: Router,
    private route: ActivatedRoute,
    private _toastr: ToastrService,
    private _categoryService: CategoryService,
    private _modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadCategories();
    });
  }

  loadCategories() {
    this._categoryService.getAll().subscribe(
      res => {
        this.categories = res;
      }, error => console.error(error))
  }

  openCategoryDeleteModal(categoryNo: number, name: string) {
    let data = {
      type: "category",
      name: name,
      successMessage: "category-delete-success",
      failMessage: "category-delete-fail",
      onSubmit: (): Observable<object> =>
        this._categoryService.delete(categoryNo)
    }

    this._genericModal.openModal(DeletionConfirmationModalComponent, data, () => {
      this.loadCategories();
    }, () => { });
  }

  openCategoryEditModal(categoryNo: number) {
    let data = {
      categoryNo: categoryNo
    }
    this._genericModal.openModal(CategoryEditComponent, data, () => {
      this.loadCategories();
    }, () => { });
  }

  openCategoryCreateModal() {
    let data = {
      new: true
    }
    this._genericModal.openModal(CategoryEditComponent, data, () => {
      this.loadCategories();
    }, () => { });
  }

}