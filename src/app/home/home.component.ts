import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { AuthenticationService } from '../services/authentication.service';
import { PushService } from '../services/push.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = "BDOaLm7zuUkci586E7e9Gks7sXbUJdcz_D4qGEI0Iz3606GxSYSECKKE6z6P49Kx2l5UDmBJ_q2UiOy2TjlXvHY";

  constructor(
    private swPush: SwPush,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private _pushService: PushService
  ) { }


  authStatus!: boolean
  ngOnInit(): void {
    this.authStatus = this.authService.isLogged();
  }

  openCreateRoomModal() {
    const modalRef = this.modalService.open(RoomEditComponent, constants.ngbModalConfig);
    let data = {
      new: true
    }
    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  statusChangeEvent(state: string) {
    switch (state) {
      case "room-create-success":
        this.toastr.success('Room was created successfully', 'Success');
        break;

      case "room-create-fail":
        this.toastr.error('An error occurred when creating the room', 'Error');
        break;

      default:
    }
  }

  getUsername() {
    return this.authService.getName();
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => { 
     let data = JSON.parse( JSON.stringify(sub));
    
     this._pushService.create(
      {
        username: this.getUsername(),
        endpoint: data.endpoint,
        expirationdate: data.expirationTime,
        p256dh: data.keys.p256dh,
        auth: data.keys.auth
      }
    ).subscribe()})
    .catch(err => console.error("Could not subscribe to notifications", err));
}
}
