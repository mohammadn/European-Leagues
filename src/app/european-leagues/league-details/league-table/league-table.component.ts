import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map, startWith } from 'rxjs';
import { SortEvent, SortHeaderDirective, compare } from 'src/app/shared-modules/directives/sort-header.directive';
import { Table } from 'src/app/shared-modules/models/table.model';
import { Team } from 'src/app/shared-modules/models/team.model';
import { TeamDetailsComponent } from './team-details/team-details.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgbPaginationModule,
    NgbTypeaheadModule,
    SortHeaderDirective,
    TeamDetailsComponent,
  ],
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss'],
  animations: [
    trigger('collapseAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        sequence([animate('150ms', style({ height: '*' })), animate('150ms', style({ opacity: 1 }))]),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        sequence([animate('100ms', style({ opacity: 0 })), animate('100ms', style({ height: 0 }))]),
      ]),
    ]),
  ],
})
export class LeagueTableComponent implements OnInit, OnDestroy {
  @ViewChildren(SortHeaderDirective) headers: QueryList<SortHeaderDirective> | undefined;
  @Input() table: Array<Table> | undefined;

  private subscriptions = new Subscription();
  private sortValues: SortEvent = { column: '', direction: '' };
  protected sortedTable: Array<Table> | undefined;
  protected filteredTable: Array<Table> | undefined;
  protected teamDetails: Team | undefined;
  protected expandedRowIndex: number | undefined = undefined;
  protected pageIndex = 1;
  protected pageSize = 7;
  protected visibleEntities = this.pageSize * this.pageIndex;

  // Form
  protected filter = new FormControl('', { nonNullable: true });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.filteredTable = this.table;
    this.subscriptions.add(
      this.filter.valueChanges
        .pipe(
          startWith(''),
          map((text) => this.search(text))
        )
        .subscribe((filteredTable) => {
          this.filteredTable = filteredTable;
          this.onSort();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private search(text: string): Array<Table> | undefined {
    return this.table?.filter((row) => {
      const term = text.toLowerCase();
      return row.team.name.toLowerCase().includes(term);
    });
  }

  protected onSort({ column, direction }: SortEvent = this.sortValues) {
    this.sortValues = { column: column, direction: direction };

    // resetting other headers
    this.headers?.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.sortedTable = this.filteredTable;
    } else {
      this.sortedTable = this.filteredTable?.slice().sort((a: any, b: any) => {
        const res = column === 'team' ? compare(a.team.name, b.team.name) : compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  protected collapseRow(rowIndex: number, teamID: number) {
    this.expandedRowIndex = this.expandedRowIndex !== rowIndex ? rowIndex : undefined;
    this.loadteamDetails(teamID);
  }

  private loadteamDetails(teamID: number) {
    this.teamDetails = undefined;
    const headers = { headers: new HttpHeaders({ 'X-Auth-Token': '75165ac7b00a48468b39ba671a4e675c' }) };

    this.subscriptions.add(
      this.http.get<Team>('api/teams/' + teamID, headers).subscribe({
        next: (team) => {
          this.teamDetails = team;
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }
}
