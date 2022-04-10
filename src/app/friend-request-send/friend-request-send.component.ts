import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageType } from '../models/enums/messageType.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-friend-request-send',
  templateUrl: './friend-request-send.component.html',
  styleUrls: ['./friend-request-send.component.scss']
})
export class FriendRequestSendComponent  {
  form!: FormGroup;

  constructor(
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService) {
    this.form = this._formBuilder.group({
      recipientName: [null, Validators.required],
      contents: [""],
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
