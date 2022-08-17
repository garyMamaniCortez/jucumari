import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Platform } from '@ionic/angular';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { Storage } from '@ionic/storage-angular';

@Injectable()
export class UsuarioService {

  clave: string;
  user: any = {};

  constructor(private afDB: AngularFirestore,
              private platform: Platform,
              private storage: Storage) { 
    
  }

  verificaUsuario(clave: string){

    clave = clave.toLocaleLowerCase();
    return new Promise( (resolve, rejects)=>{
      this.afDB.doc(`/usuarios/${ clave }`)
        .valueChanges().subscribe( data=>{
          if (data){
            this.clave = clave;
            this.user = data;
            this.guardarStorage();
            resolve(true);
          }else{
            resolve(false);
          }
          //resolve();
        } )
    } );
  }

  guardarStorage(){
    if(this.platform.is('cordova')){{
      //movil
      this.storage.set('clave', this.clave);
    }}else{
      //escritorio
      localStorage.setItem('clave', this.clave);
    }
  }

  cargarStorage(){
    return new Promise( (resolve, rejects)=>{
      if(this.platform.is('cordova')){{
        //movil

        this.storage.get('clave').then(val=>{
          if(val){
            this.clave = val
            resolve(true);
          }else{
            resolve(false);
          }
        })

      }}else{
        //escritorio
        if(localStorage.getItem('clave')){
          this.clave = localStorage.getItem('clave');
          resolve(true);
        }else{
          resolve(false);
        }
      } 
    } )
  }

}
