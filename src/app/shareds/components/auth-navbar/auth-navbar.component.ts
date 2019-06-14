import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AuthenService } from 'src/app/services/authen.service';
import { Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AccountService, IAccount } from '../../services/account.service';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authen: AuthenService,
    private iziToast: Ng2IzitoastService ,    
    private account:AccountService,
  ) { 
    this.initialloadUserLogin();
  }

  AppURL = AppURL;
  AuthURL = AuthURL;
  UserLogin : IAccount;

  ngOnInit() {
  }

  onLogout() {
    this.iziToast.success({
      title: 'แจ้งเตือน!',
      message: 'ออกจากระบบสำเร็จ',
      position: 'topRight'
    });

    this.authen.clearAuthenticated();
    this.router.navigate(['/', AppURL.Login]);
    console.log('Logout');
  }

  private initialloadUserLogin(){
    this.account
        .getUserLogin(this.authen.getAuthenticated())
        .then(userLogin => this.UserLogin = userLogin)
        .catch(err => {
          this.iziToast.warning({
            title: 'แจ้งเตือน',
            message: err.Message,
            position: 'topRight'
          });
          this.authen.clearAuthenticated();
          this.router.navigate(['/', AppURL.Login])
        })
  }
}
