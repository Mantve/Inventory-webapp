import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ListSelectComponent } from '../list-select/list-select.component';
import { CategoryResponseDto } from '../models/response/categoryResponseDto.model';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { RecursiveItemResponseDto } from '../models/response/recursiveItemResponseDto.model';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { constants } from '../_constants';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Input() items!: Array<RecursiveItemResponseDto>;
  @Input() categories!: Array<CategoryResponseDto>;
  @Input() roomId!: number;
  @Input() parentItemId!: number;
  selectedCategories: Array<CategoryResponseDto> = [];
  expandedItems: { [id: number]: boolean } = {};
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.roomId) {
      sessionStorage.getItem("room" + this.roomId) ? this.expandedItems = JSON.parse(sessionStorage.getItem("room" + this.roomId)!) : this.expandedItems = {};
    }
    else {
      sessionStorage.getItem("item" + this.roomId) ? this.expandedItems = JSON.parse(sessionStorage.getItem("item" + this.roomId)!) : this.expandedItems = [];
    }
  }

  isItemExpanded(item: RecursiveItemResponseDto) : boolean {
    console.log(item, this.expandedItems[item.id]);
    return this.expandedItems[item.id];
  }

  expandItem(item: RecursiveItemResponseDto) {
    this.expandedItems[item.id] = !this.expandedItems[item.id];
    if (this.roomId) {
      sessionStorage.setItem("room" + this.roomId, JSON.stringify(this.expandedItems));
    }
    else {
      sessionStorage.setItem("item" + this.roomId, JSON.stringify(this.expandedItems));
    }
  }

  onCategorySelected(category: CategoryResponseDto) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c.id !== category.id);
    } else {
      this.selectedCategories.push(category);
    }
  }

  isCategorySelected(category: CategoryResponseDto) {
    return this.selectedCategories.includes(category);
  }

  getItemsByCategories(categories: Array<CategoryResponseDto>, items: Array<RecursiveItemResponseDto>): Array<RecursiveItemResponseDto> {
    if (categories.length === 0) {
      return items;
    }
    let res = items.filter(i => categories.some(c => c.id === i.category.id));
    return res;
  }

  openListSelectModal(item: RecursiveItemResponseDto) {
    const modalRef = this.modalService.open(ListSelectComponent, constants.ngbModalConfig);
    let data = {
      item: item
    }
    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.modalEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  statusChangeEvent(state: string) {
    switch (state) {
      case "listitem-create-success":
        this.toastr.success('List was updated successfully', 'Success');
        break;

      case "listitem-create-fail":
        this.toastr.error('An error occurred when adding updating the list', 'Error');
        break;

      default:
    }
  }
}
