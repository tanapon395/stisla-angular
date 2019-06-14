import { IAccount } from '../../services/account.service';

export interface IAuthNavbarComponent {
    AppURL:any;
    AuthURL: any;
    UserLogin: IAccount
}