import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { UsuarioService } from './usuario.service';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  chofer: AngularFirestoreDocument<any>;
  info: any;
  private watch: Subscription;

  constructor(private afDB: AngularFirestore,
              private geolocation: Geolocation,
              public _usuarioProv: UsuarioService) {

              }
              
               inicializarChofer(){
                 
                 this.chofer = this.afDB.doc(`/usuarios/${this._usuarioProv.clave}`);
               }

  iniciarGeoLocalizacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     
      this.chofer.update({
        lat: resp.coords.latitude,
        lon: resp.coords.longitude,
        clave: this._usuarioProv.clave
      })

      this.watch = this.geolocation.watchPosition()
                  .subscribe((data) => {
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
             
       this.info = data,
       this.chofer.update({
         lat: this.info.coords.latitude,
         lon: this.info.coords.longitude,
         // lat: data.coords.latitude,
         // lon: data.coords.longitude,
         clave: this._usuarioProv.clave
         
        });
        console.log("lat & lon", this.chofer )
        
      });


     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  detenerUbicacion(){
    try {
      this.watch.unsubscribe()

    } catch(e){
      console.log(JSON.stringify(e));
    }
  }
}
