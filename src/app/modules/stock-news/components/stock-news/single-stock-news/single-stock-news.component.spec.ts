import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStockNewsComponent } from './single-stock-news.component';

describe('SingleStockNewsComponent', () => {
  let component: SingleStockNewsComponent;
  let fixture: ComponentFixture<SingleStockNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleStockNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStockNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
