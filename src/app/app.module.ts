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
import {DigitsComponent} from './home/digits.component';
import {FeaturesComponent} from './home/features.component';
import {FooterComponent} from './home/footer.component';
import {HowtoComponent} from './home/howto.component';
import {CubeComponent} from './_wallet/cube.component';
import {ResizeService} from './_services/resize';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WalletComponent,
    TFormComponent,
      AuthorComponent,
      DigitsComponent,
      HowtoComponent,
      FeaturesComponent,
      FooterComponent,
      CubeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [
      ResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
