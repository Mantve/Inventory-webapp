import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  public isUserAuthenticated!: boolean;
  rooms!: Array<RoomResponseDto>;

  constructor(private _authService: AuthenticationService, private _roomService: RoomService, private _router: Router) {
    this._authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      })
  }

  ngOnInit(): void {
     this._roomService.getAll().subscribe(
      res => {
        this.rooms = res;
    })

    this._authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      })
  }

  public checkRole(): boolean {
    return this._authService.getRole() == "Admin";
  }

  public logout = () => {
    this._authService.logout('api/logout')
      .subscribe(res => {
        this._router.navigate(["/home"]);
      },
        (error) => {
        })
  }

}
