import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { UsuarioService } from './app/services/usuario.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

rootPage: any;

  constructor(firestore: AngularFirestore,
              public navCtrl: NavController,
              platform: Platform,
              public _usuarioProv: UsuarioService) {
      platform.ready().then(() => {
    
        _usuarioProv.cargarStorage().then( existe => {

          console.log("existe", existe)
if ( existe ) {
  this.navCtrl.navigateRoot( '/home' )
  // this.rootPage = HomePage;

} else {
  this.navCtrl.navigateRoot( '/login' )
  // this.rootPage = LoginPage;
}

        });


      })
    }
}
