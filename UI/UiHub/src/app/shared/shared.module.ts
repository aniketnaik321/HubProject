import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MachineCardComponent } from './machine-card/machine-card.component';
import { RouterModule } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { LightToggleComponent } from './light-toggle/light-toggle.component';
import { SkeletonModule } from 'primeng/skeleton';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TopBarComponent,
    LoginComponent,
    MachineCardComponent,
    LightToggleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule  ,
    SkeletonModule,
    MenuModule,
    MessagesModule,
    DropdownModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TopBarComponent,
    LoginComponent,
    MachineCardComponent,
    ButtonModule,
    LightToggleComponent
  ],
  providers: [MessageService],
})
export class SharedModule { }
