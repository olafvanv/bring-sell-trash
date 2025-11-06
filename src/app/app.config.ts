import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, autoFocus: false },
    },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'bring-sell-trash',
        appId: '1:777037437597:web:9a44c4c165999cc6435274',
        storageBucket: 'bring-sell-trash.firebasestorage.app',
        apiKey: 'AIzaSyAfqzm-Y89kgoPGSuOOcmsUa_o494u4Lfw',
        authDomain: 'bring-sell-trash.firebaseapp.com',
        messagingSenderId: '777037437597',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // provideAppInitializer(appInitializer),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
