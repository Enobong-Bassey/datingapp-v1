import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { InitService } from '../core/services/init-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes, withViewTransitions()),
    provideAppInitializer(async () => {
      // Initialization logic can be added here if needed in the future
      const initService = inject(InitService);

      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            return lastValueFrom(initService.init());
          } finally {
            const splash = document.getElementById('initial-splash');
            if (splash) {
              splash.remove();
            }
            resolve();
          }
        }, 1000) // Simulated delay for splash screen
      })
    })
  ]
};
