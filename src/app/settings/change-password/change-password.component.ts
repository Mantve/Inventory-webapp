import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MustMatch } from 'src/app/validators/mustmatch';
import { ValidatedForm } from 'src/app/validators/validatedForm';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends ValidatedForm{

  constructor(
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _authenicationService: AuthenticationService,
  ) {
    super();
    this.form = this._formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    },{
      validator: MustMatch('newPassword', 'confirmPassword')
    });
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

