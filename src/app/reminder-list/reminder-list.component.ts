import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { ListCreateComponent } from '../list-create/list-create.component';
import { ListEditComponent } from '../list-edit/list-edit.component';
import { ReminderResponseDto } from '../models/response/reminderResponseDto.model';
import { ReminderCreateComponent } from '../reminder-create/reminder-create.component';
import { ReminderEditComponent } from '../reminder-edit/reminder-edit.component';
import { ReminderService } from '../services/reminder.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
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
      }, error => console.error(error))
  }

  openReminderDeleteModal(reminderNo: number, name: string) {
    const modalRef = this.modalService.open(DeletionConfirmationModalComponent,constants.ngbModalConfig);

    let data = {
      type: "reminder",
      name: "reminder for "+name,
      successMessage: "reminder-delete-success",
      failMessage: "reminder-delete-fail",
      onSubmit:  (): Observable<object> => 
        this._reminderService.delete(reminderNo)
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
    }, (error) => {
      this.loadReminders();
    });
  }

  openReminderEditModal(reminderNo: number) {
    const modalRef = this.modalService.open(ReminderEditComponent,constants.ngbModalConfig);
    let data = {
      reminderNo: reminderNo
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadReminders();
    }, (error) => {
    });
  }

  openReminderCreateModal() {
    const modalRef = this.modalService.open(ReminderCreateComponent,constants.ngbModalConfig);

    modalRef.componentInstance.createEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadReminders();
    }, (reason) => {
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