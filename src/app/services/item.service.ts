import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCreateDto } from '../models/request/itemCreateDto.model';
import { ItemUpdateDto } from '../models/request/itemUpdateDto.model';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { RecursiveItemResponseDto } from '../models/response/recursiveItemResponseDto.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  public getAllRecursiveRoom(roomId: number) {
    return this.http.get<RecursiveItemResponseDto[]>(`${this._envUrl.urlAddress}/api/room/${roomId}/itemsRecursive`, { withCredentials: true });
  }

  public getRecursive(itemId: number) {
    return this.http.get<RecursiveItemResponseDto>(`${this._envUrl.urlAddress}/api/item/${itemId}/recursive`, { withCredentials: true });
  }

  public getAllRoom(roomId: number) {
    return this.http.get<ItemResponseDto[]>(`${this._envUrl.urlAddress}/api/room/${roomId}/items`, { withCredentials: true });
  }

  public getAll(itemId: number) {
    return this.http.get<ItemResponseDto[]>(`${this._envUrl.urlAddress}/api/item/${itemId}/all`, { withCredentials: true });
  }

  public search(search: string) {
    return this.http.get<ItemResponseDto[]>(`${this._envUrl.urlAddress}/api/item/search/${search}`, { withCredentials: true });
  }

  public get(itemId: number) {
    return this.http.get<ItemResponseDto>(`${this._envUrl.urlAddress}/api/item/${itemId}`, { withCredentials: true });
  }

  public getSold() {
    return this.http.get<ItemResponseDto[]>(`${this._envUrl.urlAddress}/api/item/sold`, { withCredentials: true });
  }

  public create(data: ItemCreateDto) {
    return this.http.post(`${this._envUrl.urlAddress}/api/item`, data, { withCredentials: true });
  }

  public update(id: number, data: ItemUpdateDto) {
    return this.http.put(`${this._envUrl.urlAddress}/api/item/${id}`, data, { withCredentials: true });
  }

  public delete(id: number) {
    return this.http.delete(`${this._envUrl.urlAddress}/api/item/${id}`, { withCredentials: true });
  }
}
