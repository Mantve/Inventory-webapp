import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { AuthenticationService } from '../services/authentication.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = "BIVRDkY314VGwydMAeG-q0_VUDwbfs4zvBAKjJ57UCbWIr4e8DHFhPgfu1x94O_EsGxNPkuCFeM-2Y3SmSnv8Ao";

  constructor(
    private modalService: NgbModal, 
    private toastr: ToastrService,
     private authService: AuthenticationService,
     private swPush: SwPush,
       // private newsletterService: NewsletterService
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
    .then(sub => { console.log(JSON.stringify(sub));})
    //.then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
}
}
