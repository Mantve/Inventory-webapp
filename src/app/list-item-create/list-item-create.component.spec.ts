import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemCreateComponent } from './list-item-create.component';

describe('ListItemCreateComponent', () => {
  let component: ListItemCreateComponent;
  let fixture: ComponentFixture<ListItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
