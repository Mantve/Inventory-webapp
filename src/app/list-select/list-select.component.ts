import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ListCreateComponent } from '../list-create/list-create.component';
import { ListResponseDto } from '../models/response/listResponseDto.model';
import { ListItemService } from '../services/list-item.service';
import { ListService } from '../services/list.service';
import { constants } from '../_constants';

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss']
})
export class ListSelectComponent implements OnInit {

  @Input() fromParent: any;
  @Output() createEvent = new EventEmitter<string>();
  lists: Array<ListResponseDto> = [];

  constructor(
    private _listService: ListService,
    private _router: Router,
    private _activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _listItemService: ListItemService
  ) {
  }

  ngOnInit(): void {
    this.loadLists();

  }

  loadLists() {
    this._listService.getAll().subscribe(
      res => {
        this.lists = res;
      }, error => console.error(error))
  }

  openListCreateModal() {
    const modalRef = this.modalService.open(ListCreateComponent, constants.ngbModalConfig);

    modalRef.componentInstance.createEvent.subscribe((res: string) => this.statusChangeEvent(res))
    modalRef.result.then((result) => {
      this.loadLists();
    }, (reason) => {
    });
  }

  createListItem(itemId: number, listId: number) {
    let listItemCreateDto = {
      itemId: itemId,
      parentListId: listId,
      completed: false
    }
    console.log(this.fromParent);
    this._listItemService.create(listItemCreateDto).subscribe((res: any) => {
      this.createEvent.emit("listItem-create-success");
      this.loadLists();

      //this._activeModal.close(sendData);
    }
      , (error: any) => {
        this.createEvent.emit("listItem-create-fail");
        //this._activeModal.close(sendData);
      });
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }

  statusChangeEvent(state: string) {
    switch (state) {

      case "list-create-success":
        this.toastr.success('List was created successfully', 'Success');
        break;

      case "list-create-fail":
        this.toastr.error('An error occurred while creating the list', 'Error');
        break;


      default:
    }
  }
}
