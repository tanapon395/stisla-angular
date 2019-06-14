import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IRegisterComponent } from './register.interface';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AccountService } from 'src/app/shareds/services/account.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {
  constructor(
    private builder: FormBuilder,
    private iziToast: Ng2IzitoastService ,
    private account: AccountService ,
    private router: Router,
    private http: HttpClient) {
    this.initialCreateFormData();
  }

  Url = AppURL;
  form: FormGroup;
  public API = 'http://192.168.2.34:8080';

  onSubmit() {
    if (this.form.invalid) {
      // return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return this.iziToast.warning({
        title: 'ข้อมูลไม่ครบถ้วน!',
        message: 'กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน',
        position: 'topRight'
      });
    }
    this.account
    .onRegister(this.form.value)
    .then(res => {
      // this.http.get(this.API + '/getallusers')
      //   .subscribe(
      //   data => {console.log(data);
      //   },
      //   error => {
      //   });
      this.iziToast.success({
        title: 'ลงทะเบียนสำเร็จ!',
        message: 'กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ',
        position: 'topRight'
      });
      console.log(res);
      this.router.navigate(['/', AppURL.Login]);
    }).catch(err =>
      this.iziToast.warning({
      title: 'เกิดข้อผิดพลาด!',
      message: err.Message,
      position: 'topRight'
      })
    );
  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[A-z0-9]{6,15}$/)]],
      confirmPassword: ['', [Validators.required , this.comparePassword('password')]]
    });
  }

  private comparePassword(passwordField: string) {
    return (control: AbstractControl) => {
      if (!control.parent) { return; }
      const password = control.parent.get(passwordField);
      const passwordSubscribe = password.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        passwordSubscribe.unsubscribe();
      });
      if (control.value === password.value) {
        return;
      }
      return{ compare: true};
    };
  }
}
