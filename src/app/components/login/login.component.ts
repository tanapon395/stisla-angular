import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { ILoginComponent } from './login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Router } from '@angular/router';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {

  constructor(
    private builder: FormBuilder,
    private iziToast: Ng2IzitoastService ,
    private router: Router,
    private account: AccountService,
    private authen: AuthenService
  ) {
    this.initialCreateFormData();
    console.log(this.authen.getAuthenticated());
  }

  Url = AppURL;
  form: FormGroup;

  onSubmit() {
    if (this.form.invalid) {
      return this.iziToast.warning({
        title: 'ข้อมูลไม่ครบถ้วน!',
        message: 'กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน',
        position: 'topRight'
      });
    }
    this.account
      .onLogin(this.form.value)
      .then(res => {
        this.authen.setAuthrnticate(res.accessToken);
        this.iziToast.success({
          title: 'แจ้งเตือน!',
          message: 'เข้าสู่ระบบสำเร็จ',
          position: 'topRight'
        });
        this.router.navigate(['/' , AppURL.Authen , AuthURL.Dashboard]);
      })
      .catch(err =>
        this.iziToast.warning({
        title: 'เกิดข้อผิดพลาด!',
        message: err.Message,
        position: 'topRight'
        })
      );
  }


  private initialCreateFormData() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [true]
    });
  }
}
