import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';
import { ItemCreateComponent } from '../item-create/item-create.component';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import { RecursiveItemResponseDto } from '../models/response/recursiveItemResponseDto.model';
import { ItemService } from '../services/item.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {

  itemNo!: number;
  item!: RecursiveItemResponseDto;
  

  constructor(
  
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _itemService: ItemService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemNo = params['itemNo'];
      this.loadItem(this.itemNo);
    });
  }

  loadItem(itemNo: number) {
    this._itemService.getRecursive(itemNo).subscribe(
      res => {
        this.item = res ;
      }, error => console.error(error))
  }

  
  openItemCreateModal(roomNo: number, itemNo:number) {
    const modalRef = this.modalService.open(ItemCreateComponent,constants.ngbModalConfig);

      let data = {
        roomNo: roomNo,
        itemNo: itemNo
      }
      
    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.createEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadItem(this.itemNo);
    }, (reason) => {
    });
  }

  openItemDeleteModal(itemNo: number, name: string) {
    const modalRef = this.modalService.open(DeletionConfirmationModalComponent,constants.ngbModalConfig);

    let data = {
      type: "item",
      name: name,
      successMessage: "item-delete-success",
      failMessage: "item-delete-fail",
      onSubmit:  (): Observable<object> => 
        this._itemService.delete(itemNo)
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.deleteEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
    }, (error) => {
    });
  }

  
  openItemEditModal(itemNo: number) {
    const modalRef = this.modalService.open(ItemEditComponent,constants.ngbModalConfig);

    let data = {
      itemNo: itemNo
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.editEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((res) => {
      this.loadItem(itemNo);
    }, (error) => {
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
        this._router.navigate(["../../room/"+this.item.room.id]);
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