import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserResponseDto } from '../models/response/userResponseDto.model';
import { AuthenticationService } from '../services/authentication.service';

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
    private toastr: ToastrService,
    private _authenticationService: AuthenticationService) {
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
}
