import { Component, Input, OnInit } from '@angular/core';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { RecursiveItemResponseDto } from '../models/response/recursiveItemResponseDto.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() items!: Array<RecursiveItemResponseDto>;
  constructor() { }

  ngOnInit(): void {
  }

}
