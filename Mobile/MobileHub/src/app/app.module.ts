import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs/tabs-routing.module';
import { PushNotifications } from '@capacitor/push-notifications';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HeaderModule } from './components/header/header.module';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicModule.forRoot(), // Add this line
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
