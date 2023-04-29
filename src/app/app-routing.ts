import { Routes } from "@angular/router";
import { EuropeanLeaguesComponent } from "./european-leagues/european-leagues.component";
import { LeagueDetailsComponent } from "./european-leagues/league-details/league-details.component";

export const AppRouting: Routes = [
  { path: "", redirectTo: "european-league", pathMatch: "full" },
  { path: "european-league", component: EuropeanLeaguesComponent },
  { path: "european-league/:leagueCode", component: LeagueDetailsComponent },
  { path: "**", redirectTo: "european-league", pathMatch: "full" },
];
