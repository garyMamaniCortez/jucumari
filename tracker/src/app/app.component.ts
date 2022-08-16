import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage:any;
  constructor(platform: Platform,) {
    platform.ready().then(()=>{
      this.rootPage = LoginPage;
    })
  }
}
