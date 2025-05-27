// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import{ provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

// Merge providers inside appConfig
bootstrapApplication(AppComponent, {
  ...appConfig, // Spread appConfig first
  providers: [
    ...(appConfig.providers || []), // Ensure existing providers are not lost
  
    // Firebase initialization
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
})


