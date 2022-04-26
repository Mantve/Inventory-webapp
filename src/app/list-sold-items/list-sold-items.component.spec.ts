import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoldItemsComponent } from './list-sold-items.component';

describe('ListSoldItemsComponent', () => {
  let component: ListSoldItemsComponent;
  let fixture: ComponentFixture<ListSoldItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSoldItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSoldItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
