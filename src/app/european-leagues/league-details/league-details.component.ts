import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { Area } from "src/app/shared-modules/models/area.model";
import { Competition } from "src/app/shared-modules/models/competition.model";
import { Season } from "src/app/shared-modules/models/season.model";
import { Standing } from "src/app/shared-modules/models/standing.model";

@Component({
  standalone: true,
  imports: [CommonModule, NgbNavModule],
  selector: "app-league-details",
  templateUrl: "./league-details.component.html",
  styleUrls: ["./league-details.component.scss"],
})
export class LeagueDetailsComponent implements OnInit, OnDestroy {
  private leagueCode: string | undefined;
  protected activeTab: "home" | "away" | "total" = "home";
  protected subscriptions = new Subscription();
  protected standings: [Standing] | undefined;

  get standingsAway() {
    return this.standings?.find((standing) => standing.type === "AWAY");
  }

  get standingsHome() {
    return this.standings?.find((standing) => standing.type === "HOME");
  }

  get standingsTotal() {
    return this.standings?.find((standing) => standing.type === "TOTAL");
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.leagueCode = this.route.snapshot.paramMap.get("leagueCode") ?? undefined;
    this.loadStandings();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadStandings() {
    const headers = { headers: new HttpHeaders({ "X-Auth-Token": "75165ac7b00a48468b39ba671a4e675c" }) };

    this.subscriptions.add(
      this.http
        .get<{ filters: any; area: Area; competition: Competition; season: Season; standings: [Standing] }>(
          "api/competitions/" + this.leagueCode + "/standings",
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
