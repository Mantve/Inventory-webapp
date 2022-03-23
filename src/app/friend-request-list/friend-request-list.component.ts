import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageResponseDto } from '../models/response/messageResponseDto.model';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../services/message.service';

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
    private toastr: ToastrService,
    private _messageService: MessageService,
    private _authenticationService: AuthenticationService) {
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

  acceptFriendRequest(messageId: number){
    this._authenticationService.addFriend(messageId).subscribe(
      res => {
        
      }, error => console.error(error))
  }

}
