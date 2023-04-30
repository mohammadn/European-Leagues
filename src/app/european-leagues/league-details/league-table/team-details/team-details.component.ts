import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SortHeaderDirective } from 'src/app/shared-modules/directives/sort-header.directive';
import { Squad } from 'src/app/shared-modules/models/squad.model';
import { Team } from 'src/app/shared-modules/models/team.model';
import { AgePipe } from 'src/app/shared-modules/pipes/age.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, NgbNavModule, SortHeaderDirective, AgePipe],
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit {
  @Input() teamDetails: Team | undefined;

  protected activeTab: 'goalkeepers' | 'defenders' | 'midfielders' | 'attackers' = 'goalkeepers';
  protected squad: Array<Squad> = [];

  ngOnInit(): void {
    this.squad = this.teamDetails?.squad ?? [];
  }
}
