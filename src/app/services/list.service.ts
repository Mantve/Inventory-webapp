import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListCreateDto } from '../models/request/listCreateDto.model';
import { ListUpdateDto } from '../models/request/listUpdateDto.model';
import { ListResponseDto } from '../models/response/listResponseDto.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient, private _envUrl: EnvironmentUrlService) { }


  public getAll() {
    return this.http.get<ListResponseDto[]>(`${this._envUrl.urlAddress}/api/list/`, { withCredentials: true });
  }

  public get(id: number) {
    return this.http.get<ListResponseDto>(`${this._envUrl.urlAddress}/api/list/${id}`, { withCredentials: true });
  }

  public create(data: ListCreateDto) {
    return this.http.post(`${this._envUrl.urlAddress}/api/list`, data, { withCredentials: true });
  }

  public update(id: number, data: ListUpdateDto) {
    return this.http.put(`${this._envUrl.urlAddress}/api/list/${id}`, data, { withCredentials: true });
  }

  public delete(id: number) {
    return this.http.delete(`${this._envUrl.urlAddress}/api/list/${id}`, { withCredentials: true });
  }}
