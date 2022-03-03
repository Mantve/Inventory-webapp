import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomResponseDto } from '../models/response/roomResponseDto.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  public getAll() {
    return this.http.get<RoomResponseDto[]>(`${this._envUrl.urlAddress}/api/room/`, { withCredentials: true});
  }

  public get(id: number) {
    return this.http.get<RoomResponseDto>(`${this._envUrl.urlAddress}/api/room/${id}`, { withCredentials: true});
  }

  public create(data: RoomResponseDto) {
    return this.http.post(`${this._envUrl.urlAddress}/api/room`, data, { withCredentials: true});
  }

  public update(id: number, data: RoomResponseDto) {
    return this.http.put(`${this._envUrl.urlAddress}/api/room/${id}`, data, { withCredentials: true});
  }

  public deleteRecipe(id: number) {
    return this.http.delete(`${this._envUrl.urlAddress}/api/room/${id}`, { withCredentials: true});
  }
}
