import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './login/login.page';
import { UsuarioService } from './usuario.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LandingPipe } from './landing.pipe';
import { UbicacionService } from './ubicacion.service';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




@NgModule({
  declarations: [AppComponent, LoginPage, LandingPipe],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule,
    IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UsuarioService, UbicacionService, Geolocation],
  bootstrap: [AppComponent],
  entryComponents: [LoginPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
