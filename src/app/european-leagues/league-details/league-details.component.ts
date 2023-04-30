import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/shared-modules/models/area.model';
import { Competition } from 'src/app/shared-modules/models/competition.model';
import { Season } from 'src/app/shared-modules/models/season.model';
import { Standing } from 'src/app/shared-modules/models/standing.model';
import { Table } from 'src/app/shared-modules/models/table.model';
import { LeagueTableComponent } from './league-table/league-table.component';

@Component({
  standalone: true,
  imports: [CommonModule, NgbNavModule, LeagueTableComponent],
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.scss'],
})
export class LeagueDetailsComponent implements OnInit, OnDestroy {
  private leagueCode: string | undefined;
  private subscriptions = new Subscription();
  protected activeTab: 'home' | 'away' | 'total' = 'home';
  protected standings: Array<Standing> | undefined;

  get standingsHomeTable(): Array<Table> | undefined {
    return this.standings?.find((standing) => standing.type === 'HOME')?.table.slice();
  }

  get standingsAwayTable(): Array<Table> | undefined {
    return this.standings?.find((standing) => standing.type === 'AWAY')?.table.slice();
  }

  get standingsTotalTable(): Array<Table> | undefined {
    return this.standings?.find((standing) => standing.type === 'TOTAL')?.table.slice();
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.leagueCode = this.route.snapshot.paramMap.get('leagueCode') ?? undefined;
    this.loadStandings();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadStandings() {
    const headers = { headers: new HttpHeaders({ 'X-Auth-Token': '75165ac7b00a48468b39ba671a4e675c' }) };

    this.subscriptions.add(
      this.http
        .get<{ filters: unknown; area: Area; competition: Competition; season: Season; standings: [Standing] }>(
          'api/competitions/' + this.leagueCode + '/standings',
          headers
        )
        .subscribe({
          next: (standings) => {
            this.standings = standings.standings;
          },
          error: (error) => {
            console.log(error);
          },
        })
    );
  }
}
