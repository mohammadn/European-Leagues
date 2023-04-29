import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faChevronRight, faFutbol } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
import { Competition } from "./shared-modules/models/competition.model";

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FontAwesomeModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  protected faFutbol = faFutbol;
  protected faChevronRight = faChevronRight;

  protected subscriptions = new Subscription();
  protected topFiveEuropeanLeagueCodes = ["PL", "BL1", "PD", "SA", "FL1"];
  protected competitions: [Competition] | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCompetionsDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadCompetionsDetails(): void {
    const headers = { headers: new HttpHeaders({ "X-Auth-Token": "75165ac7b00a48468b39ba671a4e675c" }) };

    this.subscriptions.add(
      this.http
        .get<{ counter: number; filters: any; competitions: [Competition] }>("api/competitions", headers)
        .subscribe({
          next: (competitions) => {
            this.competitions = competitions.competitions;
          },
          error: (error) => {
            console.log(error);
          },
        })
    );
  }
}
