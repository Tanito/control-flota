import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  clave: string;
  user: any = {};

  private doc: Subscription;

  constructor(
    private afDB: AngularFirestore,
    private platform: Platform,
    private storage: Storage,
  ) {

  }

  verificaUsuario(clave: string) {

    clave = clave.toLocaleLowerCase();

    return new Promise((resolve, reject) => {


      this.doc = this.afDB.doc(`/usuarios/${clave}`)
        .valueChanges().subscribe(data => {
          console.log("aparezco?", data);
          // resolve();

          if (data) {
            // correcto
            this.clave = clave;
            this.user = data;
            this.guardarStorage();
            resolve(true);
          } else {
            // incorrecto
            resolve(false);
          }


        })


    });


  }


  guardarStorage() {

    if (this.platform.is('cordova')) {
      // Celular
      this.storage.set('clave', this.clave);
      // this.storage.set('user', this.user);

    } else {
      // Escritorio
      localStorage.setItem('clave', this.clave);
      // localStorage.setItem('user', this.user);
    }

  }

  cargarStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        // Celular
        this.storage.get('clave').then(val => {
          if (val) { //si existe la clave guardada, la cargo
            this.clave = val;
       
          } else {
            resolve(false);
          }
        });
      } else {
        // Escritorio
        if (localStorage.getItem('clave')) { //si existe la clave guardada, la cargo
          this.clave = localStorage.getItem('clave');
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }


  borrarUsuario() {
    this.clave = null;
    if ( this.platform.is('cordova') ) {
      this.storage.remove('clave');
    }else {
      localStorage.removeItem('clave');
    }
    this.doc.unsubscribe();
  }
}
