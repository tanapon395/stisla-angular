import { Component, OnInit } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {

  constructor(
    private builder: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: Ng2IzitoastService
  ) {
    this.initcialCreateFormData();
    this.initcialLoadData();
  }

  form: FormGroup;

  positionItems: any[] = [
    'Frontend Developer',
    'Backend Developer'
  ]

  onSubmit() {
    if (this.form.invalid) {
      return this.alert.warning({
        title: 'แจ้งเตือน !',
        message: "กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้อง",
        position: 'topRight'
      });
    }
    this.account
      .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
      .then(() => this.alert.success({
        title: 'แจ้งเตือน !',
        message: "แก้ไขข้อมูลสำเร็จ",
        position: 'topRight'
      }))
      .catch(err => {
        this.alert.warning({
          title: 'แจ้งเตือน !',
          message: err.Message,
          position: 'topRight'
        })
      })
  }

  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    const imageTypes = ['image/jpeg', 'image/png'];
    imageControl.setValue(null);
    if (input.files.length == 0) return;
    if (imageTypes.indexOf(input.files[0].type) < 0) {
      input.value = null;
      this.alert.warning({
        title: 'แจ้งเตือน !',
        message: "กรุณาอัพโหลดรูปภาพเท่านั้น",
        position: 'topRight'
      });
    }
    const reader = new FileReader;
    reader.readAsDataURL(input.files[0]);
    reader.addEventListener('load', () => {
      imageControl.setValue(reader.result);
    })
  }

  private initcialCreateFormData() {
    this.form = this.builder.group({
      email: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      image: [null]
    })
    this.form.get('email').disable();
  }

  private initcialLoadData() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(user => {
        this.form.controls['email'].setValue(user.email);
        this.form.controls['firstname'].setValue(user.firstname);
        this.form.controls['lastname'].setValue(user.lastname);
        this.form.controls['position'].setValue(user.position);
        this.form.controls['image'].setValue(user.image);
      })
      .catch(err => {
        this.alert.warning({
          title: 'เกิดข้อผิดพลาด!',
          message: err.Message,
          position: 'topRight'
        });
      });
  }
}
