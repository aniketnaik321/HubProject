import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IonicModule // Add this line
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }