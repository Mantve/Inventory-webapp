import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageType } from 'src/app/models/enums/messageType.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MustMatch } from 'src/app/validators/mustmatch';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  form!: FormGroup;

  constructor(
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _authenicationService: AuthenticationService,
  ) {
    this.form = this._formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    },{
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName)
  }

  public validateControl = (controlName: string) => {
    return this.form.controls[controlName].invalid && this.form.controls[controlName].touched
  }

  changePassword() {
    this._authenicationService.changePassword(this.form.value).subscribe((res: any) => {
      this._toastr.success('Password has been changed successfully', 'Success');

    }, (error: any) => {
      this._toastr.error(error.error.detail, 'Error changing password');
      console.error(error)
    })
  }
}

