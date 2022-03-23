import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListItemCreateDto } from '../models/request/listItemCreateDto.model';
import { ListItemUpdateDto } from '../models/request/listItemUpdateDto.model';
import { ListItemResponseDto } from '../models/response/listItemResponseDto.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  constructor(private http: HttpClient, private _envUrl: EnvironmentUrlService) { }


  public getAll() {
    return this.http.get<ListItemResponseDto[]>(`${this._envUrl.urlAddress}/api/listItem/`, { withCredentials: true });
  }

  public get(id: number) {
    return this.http.get<ListItemResponseDto>(`${this._envUrl.urlAddress}/api/listItem/${id}`, { withCredentials: true });
  }

  public create(data: ListItemCreateDto) {
    return this.http.post(`${this._envUrl.urlAddress}/api/listItem`, data, { withCredentials: true });
  }

  public update(id: number, data: ListItemUpdateDto) {
    return this.http.put(`${this._envUrl.urlAddress}/api/listItem/${id}`, data, { withCredentials: true });
  }

  public delete(id: number) {
    return this.http.delete(`${this._envUrl.urlAddress}/api/listItem/${id}`, { withCredentials: true });
  }}