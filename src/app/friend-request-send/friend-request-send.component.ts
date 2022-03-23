import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageType } from '../models/enums/messageType.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-friend-request-send',
  templateUrl: './friend-request-send.component.html',
  styleUrls: ['./friend-request-send.component.css']
})
export class FriendRequestSendComponent implements OnInit {
  form!: FormGroup;

  constructor(
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
    
  }, (error: any) => {
    console.error(error)
  })
}

  ngOnInit(): void {
  }

}
