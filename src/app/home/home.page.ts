import { Component } from '@angular/core';
import { UsuarioService } from '../app/services/usuario.service';
import { UbicacionService } from '../app/services/ubicacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
              public _usuarioProv: UsuarioService,
              public _ubicacionProv: UbicacionService,
  ) {

    this._ubicacionProv.iniciarGeoLocalizacion();
  //   _usuarioProv.cargarStorage().then( user => {

  //     console.log("user", user)

  // })

}
}
