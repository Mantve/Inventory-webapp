import { UserForAuthenticationDto } from './../../models/request/userForAuthenticationDto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/services/room.service';
import { ValidatedForm } from 'src/app/validators/validatedForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ValidatedForm implements OnInit {
  
  public errorMessage: string = '';
  public showError!: boolean;
  private _returnUrl!: string;

  constructor(private _authService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _roomService: RoomService) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]),
      password: new FormControl("", [Validators.required, Validators.maxLength(100)])
    })

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public loginUser = (loginFormValue: any) => {

    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      username: login.username,
      password: login.password
    }

    this._authService.loginUser('api/login', userForAuth)
      .subscribe(res => {
        this._authService.sendAuthStateChangeNotification(res.status === 200);
        if (res.status === 200) {
          localStorage.setItem('user',JSON.stringify(res.body));
          localStorage.setItem('loggedAt', Date.now().toString());
          this._roomService.sendRoomUpdateNotification();
          this._toastr.success('Logged in successfully', 'Success');
        }
        this._router.navigate([this._returnUrl]);
      },
        (error) => {
          this.errorMessage = "An error has occured";
          this._toastr.error('Error Logging in', 'Error');
          this.showError = true;
        })
  }

}