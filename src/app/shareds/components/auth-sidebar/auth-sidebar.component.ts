import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AccountService, IAccount } from '../../services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit {

  constructor(
    private account:AccountService,
    private authen:AuthenService,
    private router:Router,    
    private iziToast: Ng2IzitoastService ,
  ) { 
    this.initialloadUserLogin();
  }
  AppURL = AppURL;
  AuthURL = AuthURL;
  UserLogin : IAccount;
  ngOnInit() {
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
