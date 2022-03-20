import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.css']
})
export class ItemDeleteComponent implements OnInit {

  @Input() fromParent: any;
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private _activeModal: NgbActiveModal, private _itemService: ItemService) {
  }

  ngOnInit() {
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

  onSubmit(sendData: any) {
    this._itemService.delete(this.fromParent.itemNo).subscribe((res: any) => {
      this.deleteEvent.emit("item-delete-success");
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.deleteEvent.emit("item-delete-fail");
      console.error(error)
    })
  }

}
