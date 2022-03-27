import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  public isUserAuthenticated!: boolean;
  rooms!: Array<RoomResponseDto>;

  constructor(private _authService: AuthenticationService, private _roomService: RoomService, private _router: Router, private _toastr: ToastrService) {
    this._authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      });
      this._roomService.roomChanged
      .subscribe(res => {
          this.getRooms();
      });
  }

  ngOnInit(): void {
    this.getRooms();
  }

  public getRooms() {
    this._roomService.getAll().subscribe(
      res => {
        this.rooms = res;
      });
  }

  public checkRole(): boolean {
    return this._authService.getRole() == "Admin";
  }

  public logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('loggedAt');
    this._authService.logout('api/logout')
      .subscribe(res => {
        this._toastr.success('Logged out successfully', 'Success');
        this._router.navigate(["/home"]);
      },
        (error) => {
          this._toastr.error('An error has occured', 'Error');
        })
  }

}
