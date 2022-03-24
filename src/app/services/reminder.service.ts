import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReminderCreateDto } from '../models/request/reminderCreateDto.model';
import { ReminderUpdateDto } from '../models/request/reminderUpdateDto.model';
import { ReminderResponseDto } from '../models/response/reminderResponseDto.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http: HttpClient, private _envUrl: EnvironmentUrlService) { }


  public getAll() {
    return this.http.get<ReminderResponseDto[]>(`${this._envUrl.urlAddress}/api/reminder/`, { withCredentials: true });
  }

  public get(id: number) {
    return this.http.get<ReminderResponseDto>(`${this._envUrl.urlAddress}/api/reminder/${id}`, { withCredentials: true });
  }

  public create(data: ReminderCreateDto) {
    return this.http.post(`${this._envUrl.urlAddress}/api/reminder`, data, { withCredentials: true });
  }

  public update(id: number, data: ReminderUpdateDto) {
    return this.http.put(`${this._envUrl.urlAddress}/api/reminder/${id}`, data, { withCredentials: true });
  }

  public delete(id: number) {
    return this.http.delete(`${this._envUrl.urlAddress}/api/reminder/${id}`, { withCredentials: true });
  }
}