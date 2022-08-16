import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonicSlides, IonSlide, IonSlides, NavController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  @ViewChild(IonSlides) slides: IonSlides;
  
  constructor(public navCtrl: NavController,
              public alertController: AlertController) {}


  async mostratInput(){
    const alert = await this.alertController.create({
      header: 'Ingrese su codigo',
      inputs: [{
        placeholder: 'Codigo'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'Cancel'
      }, {
        text: 'Ingresar',
        handler: data=>{
          console.log(data);
        }
      }]  
    })
    await alert.present();
   
  }
  ngOnInit() {
   
  }
 

}
