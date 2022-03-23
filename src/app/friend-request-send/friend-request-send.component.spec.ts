import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestSendComponent } from './friend-request-send.component';

describe('FriendRequestSendComponent', () => {
  let component: FriendRequestSendComponent;
  let fixture: ComponentFixture<FriendRequestSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendRequestSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendRequestSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
