import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { ItemUpdateDto } from '../models/request/itemUpdateDto.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-delete-sell-confirmation-modal',
  templateUrl: './item-delete-sell-confirmation-modal.component.html',
  styleUrls: ['./item-delete-sell-confirmation-modal.component.scss']
})
export class ItemDeleteSellConfirmationModalComponent extends DeletionConfirmationModalComponent {

  constructor(
    private _itemService: ItemService,
    public override _activeModal: NgbActiveModal) {
    super(_activeModal);
  }

  onSell() {
    let itemUpdateDto: ItemUpdateDto = {
      name: this.fromParent.item?.name,
      quantity: this.fromParent.item?.quantity,
      value: this.fromParent.item?.value,
      categoryId: this.fromParent.item?.category.id,
      parentItemId: this.fromParent.item?.parentItem?.id,
      comments: this.fromParent.item?.comments,
      roomId: this.fromParent.item?.room.id,
      sold: !this.fromParent.item?.sold
    };

    this._itemService.update(this.fromParent.item.id, itemUpdateDto).subscribe((res: any) => {
      this.modalEvent.emit("item-sell-success");
      this._activeModal.close();
    }, (error: any) => {
      this.modalEvent.emit("item-sell-fail");
      console.error(error)
    })
  }
  
}
