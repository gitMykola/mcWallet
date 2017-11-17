import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';

import { AuthorComponent } from './author/index';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { WalletComponent } from './_wallet/index';
import { TFormComponent } from './test/tForm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WalletComponent,
    TFormComponent,
      AuthorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
      NgbModule.forRoot(),
      HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
