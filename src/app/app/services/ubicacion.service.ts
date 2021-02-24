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
 

  constructor(private afDB: AngularFirestore,
              private geolocation: Geolocation,
              public _usuarioProv: UsuarioService) {

                this.chofer = afDB.doc(`/usuarios/${_usuarioProv.clave}`);
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

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
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
}
