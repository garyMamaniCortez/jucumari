import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonicSlides, IonSlide, IonSlides, LoadingController, NavController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { UsuarioService } from '../usuario.service';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  @ViewChild(IonSlides) slides: IonSlides;
  
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public loadingController: LoadingController,
              public _usuarioProvider: UsuarioService,) {}

  ionViewDidLoad(){
    this.slides.lockSwipes(true);
  }


  async mostratInput(){
    const alert = await this.alertController.create({
      header: 'Ingrese su codigo',
      inputs: [{
        name: 'clave',
        placeholder: 'Codigo'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'Cancel'
      }, {
        text: 'Ingresar',
        handler: data=>{
          console.log(data);
          this.verificarUsuario(data.clave)
        }
      }]  
    })
    await alert.present();
   
  }
  ngOnInit() {
   
  }
  async noUsuario(){
    const noUsuario = await this.alertController.create({
      header: 'No existe el usuario',
      subHeader: 'Hable con el administrador de su linea',
      buttons:['Aceptar']
    });
    await noUsuario.present();
  }
 async verificarUsuario(clave: string){
  let loading = await this.loadingController.create({
    message: 'Verificando...'
  });

  console.log(clave)
  await loading.present();

    this._usuarioProvider.verificaUsuario( clave ).then( existe=>{
      if(existe){

        loading.dismiss();

        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      }else{
        loading.dismiss();
        this.noUsuario();
      }
    } )


    


 }

 ingresar(){
  this.navCtrl.navigateRoot('landig')
 }

}
