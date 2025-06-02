import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authReducer } from './state/auth.reducer';

export const appConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({
      auth: authReducer
    }),
  ],
};
