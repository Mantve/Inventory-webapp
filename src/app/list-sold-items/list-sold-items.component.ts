import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ItemDeleteSellConfirmationModalComponent } from '../item-delete-sell-confirmation-modal/item-delete-sell-confirmation-modal.component';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { ItemService } from '../services/item.service';
import { ListItemService } from '../services/list-item.service';
import { ListService } from '../services/list.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-list-sold-items',
  templateUrl: './list-sold-items.component.html',
  styleUrls: ['./list-sold-items.component.scss']
})
export class ListSoldItemsComponent implements OnInit {

  items!: Array<ItemResponseDto>;

  constructor(
    private _itemService: ItemService,
    private _modalService: NgbModal,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this._itemService.getSold().subscribe(
      res => {
        this.items = res;
      }, error => console.error(error))
  }

  getItemValueSum(): number {
    let sum = 0;
    this.items.forEach(item => {
      sum += item.value * item.quantity;
    });
    return sum;
  }
  
  openItemDeleteModal(item: ItemResponseDto, name: string) {
    const modalRef = this._modalService.open(ItemDeleteSellConfirmationModalComponent, constants.ngbModalConfig);

    let data = {
      item: item,
      type: "item",
      name: name,
      successMessage: "item-delete-success",
      failMessage: "item-delete-fail",
      onSubmit: (): Observable<object> =>
        this._itemService.delete(item.id)
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.modalEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadItems();
    }, (error) => {
      this.loadItems();
    });
  }

  statusChangeEvent(state: string) {
    switch (state) {

      case "item-edit-success":
        this.toastr.success('Item has been modified successfully', 'Success');
        break;

      case "item-edit-fail":
        this.toastr.error('An error occurred while modifying the item', 'Error');
        break;

      case "item-delete-success":
        this.toastr.success('Item has been deleted successfully', 'Success');
        break;

      case "item-delete-fail":
        this.toastr.error('An error occurred while deleting the item', 'Error');
        break;

      case "item-create-success":
        this.toastr.success('Item was created successfully', 'Success');
        break;

      case "item-create-fail":
        this.toastr.error('An error occurred while creating the item', 'Error');
        break;
      default:
    }
  }
}
