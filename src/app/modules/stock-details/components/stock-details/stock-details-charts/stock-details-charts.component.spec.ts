import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailsChartsComponent } from './stock-details-charts.component';

describe('StockDetailsChartsComponent', () => {
  let component: StockDetailsChartsComponent;
  let fixture: ComponentFixture<StockDetailsChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDetailsChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
