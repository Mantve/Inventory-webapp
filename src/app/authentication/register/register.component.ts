import { RegistrationDto } from '../../models/request/registrationDto.model';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/validators/mustmatch';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatedForm } from 'src/app/validators/validatedForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends ValidatedForm implements OnInit {
  private _returnUrl!: string;
  public errorMessage: string = '';
  public showError!: boolean;

  constructor(private formBuilder: FormBuilder, private _authService: AuthenticationService, private _router: Router,  private _route: ActivatedRoute, private _toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      username: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      confirm: new FormControl('',[Validators.required, Validators.maxLength(100)])
  }, {
      validator: MustMatch('password', 'confirm')
  });
  }

  public registerUser = (registerFormValue: any) => {
    this.showError = false;
    const formValues = { ...registerFormValue };

    const user: RegistrationDto = {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email
    };

    this._authService.registerUser("api/register", user)
    .subscribe(res => {
      if(res.status === 201){
        this._toastr.success('Registered successfully', 'Success');
        this._router.navigate(["/authentication/login"]);
    }
    },
    error => {
      this._toastr.error('Error creating account', 'Error');
      this.errorMessage = "An error has occured";
      this.showError = true;
        })
  }
}