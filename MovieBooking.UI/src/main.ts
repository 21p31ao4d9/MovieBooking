import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { LoginComponent } from './app/login/login';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});

