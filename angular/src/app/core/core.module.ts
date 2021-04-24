import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RequestService } from './services/request.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './services/error-handler.service';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileService } from './services/profile.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ForbiddenComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ForbiddenComponent,
    NotFoundComponent,
  ],
  providers: [
    RequestService,
    ErrorHandlerService,
    ProfileService,
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true,
    },
  ]
})
export class CoreModule { }
