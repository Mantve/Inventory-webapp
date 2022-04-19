import { Component, Input } from '@angular/core';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { RecursiveItemResponseDto } from '../models/response/recursiveItemResponseDto.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent  {

  @Input() items!: Array<RecursiveItemResponseDto>;
  @Input() categories!: Array<CategoryResponseDto>;
  constructor() { }

}
