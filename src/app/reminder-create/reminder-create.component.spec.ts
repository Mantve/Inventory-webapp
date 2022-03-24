import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderCreateComponent } from './reminder-create.component';

describe('ReminderCreateComponent', () => {
  let component: ReminderCreateComponent;
  let fixture: ComponentFixture<ReminderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
