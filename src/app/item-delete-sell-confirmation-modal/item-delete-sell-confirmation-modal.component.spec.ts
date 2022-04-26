import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeleteSellConfirmationModalComponent } from './item-delete-sell-confirmation-modal.component';

describe('ItemDeleteSellConfirmationModalComponent', () => {
  let component: ItemDeleteSellConfirmationModalComponent;
  let fixture: ComponentFixture<ItemDeleteSellConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDeleteSellConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDeleteSellConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
