import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { constants } from "./_constants";
@Injectable()

export class GenericModal {
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService

  ) { }

  openModal(component: any, data: any, onSuccess: Function, onError: Function) {
    const modalRef = this.modalService.open(component, constants.ngbModalConfig);
    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.modalEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      onSuccess();
    }, (reason) => {
      onError();
    });
  }

  statusChangeEvent(state: string) {
    switch (state) {
      case "list-delete-success":
        this.toastr.success('List has been deleted successfully', 'Success');
        break;

      case "list-delete-fail":
        this.toastr.error('An error occurred while deleting the list', 'Error');
        break;

      case "list-create-success":
        this.toastr.success('List was created successfully', 'Success');
        break;

      case "list-create-fail":
        this.toastr.error('An error occurred while creating the list', 'Error');
        break;

      case "list-edit-success":
        this.toastr.success('List was modified successfully', 'Success');
        break;

      case "list-edit-fail":
        this.toastr.error('An error occurred while saving changes', 'Error');
        break;
      case "reminder-delete-success":
        this.toastr.success('Reminder has been deleted successfully', 'Success');
        break;

      case "reminder-delete-fail":
        this.toastr.error('An error occurred while deleting the reminder', 'Error');
        break;

      case "reminder-create-success":
        this.toastr.success('Reminder was created successfully', 'Success');
        break;

      case "reminder-create-fail":
        this.toastr.error('An error occurred while creating the reminder', 'Error');
        break;

      case "reminder-edit-success":
        this.toastr.success('Reminder was modified successfully', 'Success');
        break;

      case "reminder-edit-fail":
        this.toastr.error('An error occurred while saving changes', 'Error');
        break;
      case "category-create-success":
        this.toastr.success('Category was created successfully', 'Success');
        break;

      case "category-create-fail":
        this.toastr.error('An error occurred while creating the category', 'Error');
        break;

      case "room-delete-success":
        this.toastr.success('Room has been deleted successfully', 'Success');
        break;

      case "room-delete-fail":
        this.toastr.error('An error occurred while deleting the room', 'Error');
        break;

      case "item-create-success":
        this.toastr.success('Item was created successfully', 'Success');
        break;

      case "item-create-fail":
        this.toastr.error('An error occurred while creating the item', 'Error');
        break;

      case "room-edit-success":
        this.toastr.success('Room was modified successfully', 'Success');
        break;

      case "room-edit-fail":
        this.toastr.error('An error occurred while saving changes', 'Error');
        break;

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