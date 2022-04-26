import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { GenericModal } from '../genericModal';
import { ReminderResponseDto } from '../models/response/reminderResponseDto.model';
import { ReminderEditComponent } from '../reminder-edit/reminder-edit.component';
import { AuthenticationService } from '../services/authentication.service';
import { PushService } from '../services/push.service';
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
    private _genericModal: GenericModal,
    private _reminderService: ReminderService,
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private _pushService: PushService,
    private swPush: SwPush) {
  }

  ngOnInit(): void {
    this.loadReminders();
    this.subscribeToNotifications();
  }

  getUsername() {
    return this.authService.getName();
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: constants.VapidPublicKey
    })
      .then(sub => {
        let data = JSON.parse(JSON.stringify(sub));

        this._pushService.create(
          {
            username: this.getUsername(),
            endpoint: data.endpoint,
            expirationdate: data.expirationTime,
            p256dh: data.keys.p256dh,
            auth: data.keys.auth
          }
        ).subscribe()
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  loadReminders() {
    this._reminderService.getAll().subscribe(
      res => {
        this.reminders = res;
        this.sortByDate();
      }, error => console.error(error))
  }

  openReminderDeleteModal(reminderNo: number, name: string) {
    let data = {
      type: "reminder",
      name: "reminder for " + name,
      successMessage: "reminder-delete-success",
      failMessage: "reminder-delete-fail",
      onSubmit: (): Observable<object> =>
        this._reminderService.delete(reminderNo)
    }
    this._genericModal.openModal(DeletionConfirmationModalComponent, data, () => { this.loadReminders(); }, () => {
      this.loadReminders();
    }
    )
  }

  openReminderEditModal(reminderId: number) {
    let data = {
      reminderId: reminderId
    }
    this._genericModal.openModal(ReminderEditComponent, data, () => { this.loadReminders(); }, () => { });
  }

  openReminderCreateModal() {

    let data = {
      new: true
    }
    this._genericModal.openModal(ReminderEditComponent, data, () => { this.loadReminders(); }, () => { });
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

}