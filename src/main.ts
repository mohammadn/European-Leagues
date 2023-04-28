import { importProvidersFrom } from "@angular/core";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { AppRouting } from "./app/app-routing";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(AppRouting), importProvidersFrom(BrowserModule)],
}).catch((err) => console.error(err));
