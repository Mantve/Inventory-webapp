import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  @Input() fromParent: any;
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(
    private _activeModal: NgbActiveModal, 
    private _categoryService: CategoryService) {
  }

  ngOnInit() {
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

  onSubmit(sendData: any) {
    this._categoryService.delete(this.fromParent.categoryNo).subscribe((res: any) => {
      this.deleteEvent.emit("category-delete-success");
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.deleteEvent.emit("category-delete-fail");
      console.error(error)
    })
  }

}
