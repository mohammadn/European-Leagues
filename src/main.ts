/// <reference types="@angular/localize" />

import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppRouting } from './app/app-routing';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(AppRouting), provideHttpClient(), importProvidersFrom(BrowserModule), provideAnimations()],
}).catch((err) => console.error(err));
