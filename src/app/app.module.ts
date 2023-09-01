import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from 'src/components/interceptor/auth-interceptor';
import { ToastrComponent, toastrConfig } from 'src/components/toastr/toastr.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContatosModule } from './pages/contatos/contatos.module';
import { LoginModule } from './pages/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    ToastrComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    AppRoutingModule,
    ToastrModule.forRoot(toastrConfig),
    BrowserAnimationsModule,
    FontAwesomeModule,
    RouterModule,
    LoginModule,
    ContatosModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
