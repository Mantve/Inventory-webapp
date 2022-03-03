import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RoomCreateComponent } from '../room-create/room-create.component';
import { AuthenticationService } from '../services/authentication.service';

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

  openCreateRecipeModal() {
    const modalRef = this.modalService.open(RoomCreateComponent,
      {
        scrollable: true,
        size: 'xl',
        //windowClass: 'myCustomModalClass',
        centered: true
        // keyboard: false,
        // backdrop: 'static'
      });

    modalRef.componentInstance.createEvent.subscribe((res: string) => this.statusChangeEvent(res))
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
        this.toastr.error('An error occurred when deleting the room', 'Error');
        break;

      default:
    }
  }
}
