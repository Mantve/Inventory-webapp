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
export class HomeComponent {


  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _authService: AuthenticationService,
  ) { }

  isLogged() {
    return this._authService.isLogged();
  }

  openCreateRoomModal() {
    const modalRef = this.modalService.open(RoomEditComponent, constants.ngbModalConfig);
    let data = {
      new: true
    }
    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.modalEvent.subscribe((res: string) => this.statusChangeEvent(res))
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
    return this._authService.getName();
  }

}
