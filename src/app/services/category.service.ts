import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryCreateDto } from '../models/request/categoryCreateDto.model';
import { CategoryUpdateDto } from '../models/request/categoryUpdateDto.model';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private _envUrl: EnvironmentUrlService) { }


  public getAll() {
    return this.http.get<CategoryResponseDto[]>(`${this._envUrl.urlAddress}/api/category/`, { withCredentials: true });
  }

  public getAllFromRoom(id: number) {
    return this.http.get<CategoryResponseDto[]>(`${this._envUrl.urlAddress}/api/room/${id}/categories`, { withCredentials: true });
  }

  public get(id: number) {
    return this.http.get<CategoryResponseDto>(`${this._envUrl.urlAddress}/api/category/${id}`, { withCredentials: true });
  }

  public create(data: CategoryCreateDto) {
    return this.http.post(`${this._envUrl.urlAddress}/api/category`, data, { withCredentials: true });
  }

  public update(id: number, data: CategoryUpdateDto) {
    return this.http.put(`${this._envUrl.urlAddress}/api/category/${id}`, data, { withCredentials: true });
  }

  public delete(id: number) {
    return this.http.delete(`${this._envUrl.urlAddress}/api/category/${id}`, { withCredentials: true });
  }
}