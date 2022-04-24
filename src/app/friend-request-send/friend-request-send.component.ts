import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageType } from '../models/enums/messageType.model';
import { MessageService } from '../services/message.service';
import { ValidatedForm } from '../validators/validatedForm';

@Component({
  selector: 'app-friend-request-send',
  templateUrl: './friend-request-send.component.html',
  styleUrls: ['./friend-request-send.component.scss']
})
export class FriendRequestSendComponent extends ValidatedForm {

  constructor(
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService) {
    super();
    this.form = this._formBuilder.group({
      recipientName: [null, [Validators.required, Validators.maxLength(15)]],
      contents: ["",[Validators.maxLength(100)]],
      messageType:[MessageType.FriendRequest,Validators.required]
    });
  }
  
sendRequest(){
  
  this._messageService.create(this.form.value).subscribe((res: any) => {
    this._toastr.success('Friend request has been sent successfully', 'Success');

  }, (error: any) => {
    this._toastr.error(error.error.detail, 'Error sending friend request');
    console.error(error)
  })
}

}
