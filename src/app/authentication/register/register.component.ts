import { RegistrationDto } from '../../models/request/registrationDto.model';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/validators/mustmatch';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private _returnUrl!: string;
  public errorMessage: string = '';
  public showError!: boolean;

  constructor(private formBuilder: FormBuilder, private _authService: AuthenticationService, private _router: Router,  private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z ]*$')]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('',[Validators.required])
  }, {
      validator: MustMatch('password', 'confirm')
  });
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    this.showError = false;
    const formValues = { ...registerFormValue };

    const user: RegistrationDto = {
      username: formValues.username,
      password: formValues.password,
    };

    this._authService.registerUser("api/register", user)
    .subscribe(res => {
      if(res.status === 200){
        this._router.navigate(["/authentication/login"]);
    }
    },
    error => {
      this.errorMessage = "An error has occured";
      this.showError = true;
        })
  }
}