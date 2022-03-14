import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RoomCreateDto } from '../models/request/roomCreateDto.model';
import { RoomUpdateDto } from '../models/request/roomUpdateDto.model';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private _roomChangeSub = new Subject<boolean>()
  public roomChanged = this._roomChangeSub.asObservable();

  constructor(private http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  public sendRoomUpdateNotification() {
    this._roomChangeSub.next(true);
  }

  public getAll() {
    return this.http.get<RoomResponseDto[]>(`${this._envUrl.urlAddress}/api/room/`, { withCredentials: true });
  }

  public get(id: number) {
    return this.http.get<RoomResponseDto>(`${this._envUrl.urlAddress}/api/room/${id}`, { withCredentials: true });
  }

  public create(data: RoomCreateDto) {
    return this.http.post(`${this._envUrl.urlAddress}/api/room`, data, { withCredentials: true });
  }

  public update(id: number, data: RoomUpdateDto) {
    return this.http.put(`${this._envUrl.urlAddress}/api/room/${id}`, data, { withCredentials: true });
  }

  public delete(id: number) {
    return this.http.delete(`${this._envUrl.urlAddress}/api/room/${id}`, { withCredentials: true });
  }
}
