import { Component, OnInit } from '@angular/core';
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


  constructor(private modalService: NgbModal, private toastr: ToastrService, private authService: AuthenticationService) { }

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
}
