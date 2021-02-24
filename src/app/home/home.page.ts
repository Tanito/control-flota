import { Component } from '@angular/core';
import { UsuarioService } from '../app/services/usuario.service';
import { UbicacionService } from '../app/services/ubicacion.service';

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
              public _usuarioProv: UsuarioService,
              public _ubicacionProv: UbicacionService,
  ) {

    this._ubicacionProv.iniciarGeoLocalizacion();

    this._ubicacionProv.chofer.valueChanges()
    .subscribe( data => {
      this.user = data;
    })
  //   _usuarioProv.cargarStorage().then( user => {

  //     console.log("user", user)

  // })

}
}
