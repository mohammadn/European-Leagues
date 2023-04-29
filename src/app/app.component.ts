import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  protected faFutbol = faFutbol;
}
