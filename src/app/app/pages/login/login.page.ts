import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides  } from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { HomePage } from '../../../home/home.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public _usuarioProv: UsuarioService,
    
    ) {
 
}

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);

  }
  async mostrarInput() {
    const alert = await this.alertCtrl.create({
      cssClass: 'input-class',
      header: 'Ingrese el usuario',
        inputs: [{
        name: 'username',
        placeholder: 'Username'
      }],
     
      buttons: [{
        text: 'Cancelar',
      role: 'cancel'},{
        text: 'Ingresar',
        handler: data => {
          console.log(data);
          this.verificarUsuario(data.username)
        }
      }]

    });
    // console.log(alert.name)
    await alert.present();
  }

  async verificarUsuario( clave: string ) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'loading-class',
      message: 'Verificando',
      duration: 2000
    });

    console.log(clave)
    await loading.present();
   
    this._usuarioProv.verificaUsuario( clave )
    .then( existe => {
      loading.dismiss()
      if ( existe ) {
               this.slides.lockSwipes(false);
               this.slides.lockSwipeToNext(false);
               this.slides.slideNext()
               this.slides.lockSwipeToNext(true);
               this.slides.lockSwipes(true);
      } else {
            this.loginIncorrecto()
      }
    })
   

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }
async loginIncorrecto(){

  const alert = await this.alertCtrl.create({
    header:'Patente incorrecta',
    message: 'Hable con el administrador o pruebe de nuevo',
    buttons: ['Aceptar']
         })
        await alert.present();
}


  verificarUsuario33( clave: string ) {

    let loading = this.loadingCtrl.create({
      message: 'Verificando'
    });

    

  }

  ingresar(){
    this.navCtrl.navigateRoot( '/home' );
  }
}
