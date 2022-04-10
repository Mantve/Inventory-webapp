import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { ReminderResponseDto } from '../models/response/reminderResponseDto.model';
import { ReminderEditComponent } from '../reminder-edit/reminder-edit.component';
import { ReminderService } from '../services/reminder.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit {

  reminders!: Array<ReminderResponseDto>;

  constructor(
    private _reminderService: ReminderService,
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    this.loadReminders();

  }

  loadReminders() {
    this._reminderService.getAll().subscribe(
      res => {
        this.reminders = res;
        this.sortByDate();
      }, error => console.error(error))
  }

  openReminderDeleteModal(reminderNo: number, name: string) {
    const modalRef = this.modalService.open(DeletionConfirmationModalComponent, constants.ngbModalConfig);

    let data = {
      type: "reminder",
      name: "reminder for " + name,
      successMessage: "reminder-delete-success",
      failMessage: "reminder-delete-fail",
      onSubmit: (): Observable<object> =>
        this._reminderService.delete(reminderNo)
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadReminders();
    }, (error) => {
      this.loadReminders();
    });
  }

  openReminderEditModal(reminderId: number) {
    const modalRef = this.modalService.open(ReminderEditComponent, constants.ngbModalConfig);
    let data = {
      reminderId: reminderId
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadReminders();
    }, (error) => {
    });
  }

  openReminderCreateModal() {
    const modalRef = this.modalService.open(ReminderEditComponent, constants.ngbModalConfig);

    let data = {
      new: true
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadReminders();
    }, (reason) => {
    });
  }

  onSortChange() {
    let select = document.querySelector("#sortSelect") as HTMLSelectElement;
    let sortType = select.value;
    switch (sortType) {
      case "date":
        this.sortByDate();
        break;
      case "name":
        this.sortByName();
        break;
    }
  }

  sortByDate() {
    this.reminders.sort((a, b) => {
      return new Date(a.reminderTime).getTime() - new Date(b.reminderTime).getTime();
    });
  }

  sortByName() {
    this.reminders.sort((a, b) => {
      if (a.item.name < b.item.name) {
        return -1;
      }
      if (a.item.name > b.item.name) {
        return 1;
      }
      return 0;
    });
  }

  statusChangeEvent(state: string) {
    switch (state) {

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
      default:
    }
  }
}