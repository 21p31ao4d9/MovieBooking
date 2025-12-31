import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations'; // Angular 21

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(), // ✅ required for toastr animations
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-below-navbar', // ✅ custom class
        preventDuplicates: true,
      })
    )
  ]
});
