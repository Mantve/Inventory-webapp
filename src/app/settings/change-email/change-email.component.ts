import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MustMatch } from 'src/app/validators/mustmatch';
import { ValidatedForm } from 'src/app/validators/validatedForm';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends ValidatedForm {

  constructor(
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _authenicationService: AuthenticationService,
  ) {
    super();
    this.form = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      confirmEmail: [null, [Validators.required, Validators.email]]
    },{
      validator: MustMatch('email', 'confirmEmail')
    });
  }

  changeEmail() {
    this._authenicationService.updateUser(this.form.value).subscribe((res: any) => {
      this._toastr.success('Email has been changed successfully', 'Success');

    }, (error: any) => {
      this._toastr.error(error.error.detail, 'Error changing email');
      console.error(error)
    })
  }

}
