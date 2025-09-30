import {
  ApplicationConfig,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appInitializer } from './app.initializer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
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
    provideFirestore(() => getFirestore()),
    provideAppInitializer(appInitializer),
  ],
};
