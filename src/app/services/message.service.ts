import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageType } from '../models/enums/messageType.model';
import { MessageCreateDto } from '../models/request/messageCreateDto.model';
import { MessageResponseDto } from '../models/response/messageResponseDto.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private _envUrl: EnvironmentUrlService) { }


  public getAll() {
    return this.http.get<MessageResponseDto[]>(`${this._envUrl.urlAddress}/api/message/`, { withCredentials: true });
  }

  public getAllType(messageType:MessageType) {
    return this.http.get<MessageResponseDto[]>(`${this._envUrl.urlAddress}/api/message/type/${messageType}`, { withCredentials: true });
  }

  public get(id: number) {
    return this.http.get<MessageResponseDto>(`${this._envUrl.urlAddress}/api/message/${id}`, { withCredentials: true });
  }

  public create(data: MessageCreateDto) {
    return this.http.post(`${this._envUrl.urlAddress}/api/message`, data, { withCredentials: true });
  }

  public update(id: number, data: MessageCreateDto) {
    return this.http.put(`${this._envUrl.urlAddress}/api/message/${id}`, data, { withCredentials: true });
  }

  public delete(id: number) {
    return this.http.delete(`${this._envUrl.urlAddress}/api/message/${id}`, { withCredentials: true });
  }
}