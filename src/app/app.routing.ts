import {Routes , RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppURL } from './app.url';
import { RegisterComponent } from './components/register/register.component';

const RouteList: Routes = [
    {path : '' , redirectTo: AppURL.Login , pathMatch: 'full'},
    {path : AppURL.Login, component: LoginComponent},
    {path : AppURL.Register , component: RegisterComponent},
    {path : AppURL.Authen , loadChildren: './authentication/authentication.module#AuthenticationModule'}
];

export const AppRouting = RouterModule.forRoot(RouteList);

