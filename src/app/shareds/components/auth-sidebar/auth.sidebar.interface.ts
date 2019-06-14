import { IAccount } from '../../services/account.service';

export interface IAuthSidebarComponent {
    AppURL:any;
    AuthURL: any;
    UserLogin: IAccount
}