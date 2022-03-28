import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { UserResponseDto } from '../models/response/userResponseDto.model';
import { AuthenticationService } from '../services/authentication.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  friends!: Array<UserResponseDto>;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private _toastr: ToastrService,
    private _authenticationService: AuthenticationService) {
      this._authenticationService.friendChanged
      .subscribe(res => {
        this.loadFriends();
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadFriends();
    });
  }

  loadFriends() {
    this._authenticationService.getFriends().subscribe(
      res => {
        this.friends = res;
      }, error => console.error(error))
  }

  openFriendDeleteModal(name: string) {
    const modalRef = this.modalService.open(DeletionConfirmationModalComponent, constants.ngbModalConfig);

    let data = {
      type: "friend",
      name: name,
      successMessage: "friend-delete-success",
      failMessage: "friend-delete-fail",
      onSubmit: (): Observable<object> =>
        this._authenticationService.unfriend(name)
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

      case "friend-delete-success":
        this._toastr.success('Friendship ended', 'Success');
        break;

      case "friend-delete-fail":
        this._toastr.error('An error occurred while ending the friendship', 'Error');
        break;
    }
  }
}
