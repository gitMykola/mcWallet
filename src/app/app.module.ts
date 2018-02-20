import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';

import { AuthorComponent } from './author';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { WalletComponent } from './_wallet';
import { TFormComponent } from './test';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import {DigitsComponent} from './home/digits.component';
import {FeaturesComponent} from './home/features.component';
import {FooterComponent} from './home/footer.component';
import {HowtoComponent} from './home/howto.component';
import {ResizeService} from './_services/resize';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslatorService} from './_services/translator.service';
import {CubeAComponent} from './_wallet/cubeA/cubeA.component';
import {StartTextComponent} from './_wallet/startText/starttext.component';
import {AmmountComponent} from './components/ammount.component';
import {GoToTopComponent} from './components/goToTop.component';
import {LocalStorageService} from './_services/localStorage.service';
import {InfoMonitor} from './_services/info.monitor';
import {InfoComponent} from './components/info.component';
import {DashboardComponent} from './components/dashboard.component';

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
      CubeAComponent,
      StartTextComponent,
      AmmountComponent,
      GoToTopComponent,
      InfoComponent,
      DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
      ResizeService,
      TranslatorService,
      LocalStorageService,
      InfoMonitor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
