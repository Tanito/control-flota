import { Component } from '@angular/core';
import { UsuarioService } from '../app/services/usuario.service';
import { UbicacionService } from '../app/services/ubicacion.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lat: number;
  lon: number;
  user: any = {};

  constructor(
              public navCtrl: NavController,
              public _usuarioProv: UsuarioService,
              public _ubicacionProv: UbicacionService,
  ) {

    this._ubicacionProv.iniciarGeoLocalizacion();
    this._ubicacionProv.inicializarChofer();
    this._ubicacionProv.chofer.valueChanges()
    .subscribe( data => {
      this.user = data;
    })

}

salir(){
  this._ubicacionProv.detenerUbicacion();
  this._usuarioProv.borrarUsuario();
  this.navCtrl.navigateRoot( '/login' );
}
}
