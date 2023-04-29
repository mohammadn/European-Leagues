import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuropeanLeaguesComponent } from './european-leagues.component';

describe('EuropeanLeaguesComponent', () => {
  let component: EuropeanLeaguesComponent;
  let fixture: ComponentFixture<EuropeanLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EuropeanLeaguesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EuropeanLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
