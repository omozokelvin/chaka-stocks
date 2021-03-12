import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorTickerComponent } from './sector-ticker.component';

describe('SectorTickerComponent', () => {
  let component: SectorTickerComponent;
  let fixture: ComponentFixture<SectorTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectorTickerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
