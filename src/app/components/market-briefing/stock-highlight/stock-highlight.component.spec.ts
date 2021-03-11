import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHighlightComponent } from './stock-highlight.component';

describe('StockHighlightComponent', () => {
  let component: StockHighlightComponent;
  let fixture: ComponentFixture<StockHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockHighlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
