import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//Mapas
import { AgmCoreModule } from '@agm/core';
//Plugins
import { Geolocation } from '@ionic-native/geolocation/ngx';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule, 
            AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule,
            IonicStorageModule.forRoot(),
            AgmCoreModule.forRoot({
              apiKey: 'AIzaSyDYMNbtg3vgmbRiOMYjMZLDe78jlLqTT2w'
            })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
