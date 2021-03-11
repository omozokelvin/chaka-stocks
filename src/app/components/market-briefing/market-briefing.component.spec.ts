import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketBriefingComponent } from './market-briefing.component';

describe('MarketBriefingComponent', () => {
  let component: MarketBriefingComponent;
  let fixture: ComponentFixture<MarketBriefingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketBriefingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketBriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
