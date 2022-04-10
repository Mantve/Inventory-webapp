import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deletion-confirmation-modal',
  templateUrl: './deletion-confirmation-modal.component.html',
  styleUrls: ['./deletion-confirmation-modal.component.scss']
})
export class DeletionConfirmationModalComponent  {
  @Input() fromParent: any;
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(
    private _activeModal: NgbActiveModal) {
  }

  closeModal(sendData: any) {
    this._activeModal.close(sendData);
  }
  
  onSubmit(sendData: any) {
    this.fromParent.onSubmit().subscribe((res: any) => {
      this.deleteEvent.emit(this.fromParent.successMessage);
      this._activeModal.close(sendData);
    }, (error: any) => {
      this.deleteEvent.emit(this.fromParent.failMessage);
      console.error(error)
    })
  }
}
