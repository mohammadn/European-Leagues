import { Routes } from "@angular/router";

export const AppRouting: Routes = [{ path: "**", redirectTo: ".", pathMatch: "full" }];
