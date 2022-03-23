import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { ItemCreateComponent } from '../item-create/item-create.component';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { RoomDeleteComponent } from '../room-delete/room-delete.component';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { CategoryService } from '../services/category.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories!: Array<CategoryResponseDto>;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _categoryService: CategoryService) {
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
    const modalRef = this.modalService.open(CategoryDeleteComponent,constants.ngbModalConfig);

    let data = {
      categoryNo: categoryNo,
      name: name
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadCategories();
    }, (error) => {
    });
  }

  openCategoryEditModal(categoryNo: number) {
    const modalRef = this.modalService.open(CategoryEditComponent,constants.ngbModalConfig);

    let data = {
      categoryNo: categoryNo
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadCategories();
    }, (error) => {
    });
  }

  openCategoryCreateModal() {
    const modalRef = this.modalService.open(CategoryCreateComponent,constants.ngbModalConfig);


    modalRef.componentInstance.createEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadCategories();
    }, (reason) => {
    });
  }

  statusChangeEvent(state: string) {
    switch (state) {

      case "category-delete-success":
        this.toastr.success('category has been deleted successfully', 'Success');
        break;

      case "category-delete-fail":
        this.toastr.error('An error occurred while deleting the category', 'Error');
        break;

      case "category-create-success":
        this.toastr.success('category was created successfully', 'Success');
        break;

      case "category-create-fail":
        this.toastr.error('An error occurred while creating the category', 'Error');
        break;

        case "category-edit-success":
          this.toastr.success('category was modified successfully', 'Success');
          break;
  
        case "category-edit-fail":
          this.toastr.error('An error occurred while category saving changes', 'Error');
          break;
          case "item-edit-success":
            this.toastr.success('Item has been modified successfully', 'Success');
            break;
    
    }
  }
}