import {Routes , RouterModule} from '@angular/router';
import { AuthURL } from './authentication.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MembersComponent } from './components/members/members.component';
import { MembersCreateComponent } from './components/members-create/members-create.component';

const RouteList: Routes = [
    {path : '' , redirectTo: AuthURL.Dashboard , pathMatch: 'full'},
    {path : AuthURL.Dashboard, component: DashboardComponent},
    {path : AuthURL.Setting, component: SettingComponent},
    {path : AuthURL.Profile, component: ProfileComponent},
    {path : AuthURL.Members, component: MembersComponent},
    {path : AuthURL.MembersCreate, component: MembersCreateComponent}
];

export const AuthenticationRouting = RouterModule.forChild(RouteList);

