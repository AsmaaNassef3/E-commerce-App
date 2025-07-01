import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { HeadersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { loodingInterceptor } from './core/interceptors/headers/looding/looding.interceptor'; // Assuming this is also correct

import { NgxSpinnerModule } from "ngx-spinner";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    // Correctly provide HttpClient with your interceptors
    provideHttpClient(withFetch(), withInterceptors([HeadersInterceptor, loodingInterceptor])),
    provideAnimations(),
    // Configure Toastr for notifications
    provideToastr({
      timeOut: 3000, // Duration of toast messages
      positionClass: 'toast-top-right', // Position on screen
      preventDuplicates: true, // Prevent duplicate messages
      closeButton: true, // Allow user to close messages
      progressBar: true, // Show progress bar
    }),
    importProvidersFrom(NgxSpinnerModule)
  ]
};
