import { RegistrationDto } from '../models/request/registrationDto.model';
import { RegistrationResponseDto } from './../models/response/registrationResponseDto.model';
import { UserResponseDto } from './../models/response/userResponseDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { UserForAuthenticationDto } from '../models/request/userForAuthenticationDto.model';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private cookieService: CookieService) { }

  public registerUser = (route: string, body: RegistrationDto) => {
    return this._http.post<RegistrationResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { observe: 'response', withCredentials: true });
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { observe: 'response', withCredentials: true });
  }

  public logout = (route: string) => {
    this.sendAuthStateChangeNotification(false);
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), "", { observe: 'response', withCredentials: true });
  }

  public getUser = () => {
    return this._http.get<UserResponseDto>(this.createCompleteRoute('api/user', this._envUrl.urlAddress), { observe: 'response', withCredentials: true });
  }

  public getFriends = () => {
    return this._http.get<UserResponseDto[]>(this.createCompleteRoute('api/friends', this._envUrl.urlAddress), { withCredentials: true });
  }

  public addFriend = (messageId:number) => {
    return this._http.post(this.createCompleteRoute('api/friends/'+messageId, this._envUrl.urlAddress),"",  { withCredentials: true });
  }

  public getRole = () => {
    let token = this.cookieService.get('jwt');
    if (!token)
      return "";
    return (jwtDecode(token) as any)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  public getName = () => {
    let token = this.cookieService.get('jwt');
    if (!token)
      return "";
    return (jwtDecode(token) as any)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }

  public isLogged = () => {
    let token = this.cookieService.get('jwt');
    if (!token || token == ""){
      console.log("no token found")
      return false;
    }
    let exp = (jwtDecode(token) as any)["exp"];
    if (!exp || Number(exp) < new Date().getTime()/1000)
    {
      console.log("expired" + " " + Number(exp) + "<" +(new Date().getTime()/1000))
      return false;
    }
    return true;
  }
}