import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { MessageResponseDto } from '../models/response/messageResponseDto.model';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../services/message.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.css']
})
export class FriendRequestListComponent implements OnInit {

  requests!: Array<MessageResponseDto>;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private _toastr: ToastrService,
    private _messageService: MessageService,
    private _authenticationService: AuthenticationService) {
    this._authenticationService.friendChanged
      .subscribe(res => {
        this.loadFriendRequests();
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadFriendRequests();
    });
  }

  loadFriendRequests() {
    this._messageService.getAll().subscribe(
      res => {
        this.requests = res;
      }, error => console.error(error))
  }

  acceptFriendRequest(messageId: number) {
    this._authenticationService.addFriend(messageId).subscribe(
      res => {
        this._toastr.success('Friend added', 'Success');
        this._authenticationService.sendFriendStateChangeNotification();
      }, error => {
        console.error(error)

        this._toastr.error(error.error.detail, 'Error adding friend');
      })
  }

  openRequestDeleteModal(messageNo: number, name: string) {
    const modalRef = this.modalService.open(DeletionConfirmationModalComponent, constants.ngbModalConfig);

    let data = {
      type: "request",
      name: name,
      successMessage: "request-delete-success",
      failMessage: "request-delete-fail",
      onSubmit: (): Observable<object> =>
        this._messageService.delete(messageNo)
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this._authenticationService.sendFriendStateChangeNotification();
    }, (error) => {
    });
  }

  statusChangeEvent(state: string) {
    switch (state) {

      case "request-delete-success":
        this._toastr.success('Request has been deleted successfully', 'Success');
        break;

      case "request-delete-fail":
        this._toastr.error('An error occurred while deleting the request', 'Error');
        break;
    }
  }
}
