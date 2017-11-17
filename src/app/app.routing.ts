import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthorComponent } from './author/index';

import { WalletComponent } from './_wallet/index';
// import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'wallet', component: WalletComponent},
    { path: 'author', component: AuthorComponent},
    { path: '', component: HomeComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
