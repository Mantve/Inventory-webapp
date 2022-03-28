import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomShareComponent } from './room-share.component';

describe('RoomShareComponent', () => {
  let component: RoomShareComponent;
  let fixture: ComponentFixture<RoomShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
