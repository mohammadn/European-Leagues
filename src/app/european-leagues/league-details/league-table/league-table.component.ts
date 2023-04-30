import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortEvent, SortHeaderDirective, compare } from 'src/app/shared-modules/directives/sort-header.directive';
import { Table } from 'src/app/shared-modules/models/table.model';

@Component({
  standalone: true,
  imports: [CommonModule, SortHeaderDirective],
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss'],
})
export class LeagueTableComponent implements OnInit {
  @ViewChildren(SortHeaderDirective) headers: QueryList<SortHeaderDirective> | undefined;
  @Input() table: Array<Table> | undefined;

  protected sortedTable: Array<Table> | undefined;

  ngOnInit(): void {
    this.sortedTable = this.table;
  }

  protected onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers?.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.sortedTable = this.table;
    } else {
      this.sortedTable = this.table?.slice().sort((a: any, b: any) => {
        const res = column === 'team' ? compare(a.team.name, b.team.name) : compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
