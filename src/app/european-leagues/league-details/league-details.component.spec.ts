import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LeagueDetailsComponent } from './league-details.component';

describe('LeagueDetailsComponent', () => {
  let component: LeagueDetailsComponent;
  let fixture: ComponentFixture<LeagueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueDetailsComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load standings', fakeAsync(() => {
    spyOn(component['http'], 'get').and.returnValue(of({ standings: [{ type: 'AWAY' }] }));

    component['loadStandings']();
    tick();

    expect(component['standings']).toEqual([{ type: 'AWAY' }] as any);
  }));

  // it('should catch load standings error', fakeAsync(() => {
  //   spyOn(component['http'], 'get').and.returnValue(throwError(() => of({ error: 'errorMessage' })));

  //   component['loadStandings']();
  //   tick();

  //   expect(component['standings']).toEqual([{ type: 'AWAY' }] as any);
  // }));
});
