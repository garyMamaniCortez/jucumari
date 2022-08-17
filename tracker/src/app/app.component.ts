import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage:any;
  constructor(platform: Platform,public _usuarioProv: UsuarioService) {
    platform.ready().then(()=>{
      _usuarioProv.cargarStorage().then(existe=>{
        if(existe){
          this.rootPage = HomePage;
        }else{
          this.rootPage = LoginPage;
        }
      })
      
    })
  }
}
