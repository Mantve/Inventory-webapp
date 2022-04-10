import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscriptionCreateDto } from '../models/request/subscriptionCreateDto.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  public create(data: SubscriptionCreateDto) {
    return this.http.post(`${this._envUrl.urlAddress}/api/subscription`, data, { withCredentials: true });
  }

}
