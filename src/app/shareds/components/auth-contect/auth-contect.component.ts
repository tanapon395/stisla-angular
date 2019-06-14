import { Component, OnInit } from '@angular/core';
declare const App: any;
@Component({
  selector: 'app-auth-contect',
  templateUrl: './auth-contect.component.html',
  styleUrls: ['./auth-contect.component.css']
})
export class AuthContectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    App.initialLoadPage();
  }

}
