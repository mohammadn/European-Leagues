import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { EuropeanLeaguesComponent } from './european-leagues.component';

describe('EuropeanLeaguesComponent', () => {
  let component: EuropeanLeaguesComponent;
  let fixture: ComponentFixture<EuropeanLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EuropeanLeaguesComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EuropeanLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load european leagues', fakeAsync(() => {
    spyOn<any>(component['http'], 'get').and.returnValue(of({ competitions: [{ id: 123 }] }));

    component['loadCompetionsDetails']();
    tick();

    expect(component['competitions']).toEqual([{ id: 123 }] as any);
  }));
});
