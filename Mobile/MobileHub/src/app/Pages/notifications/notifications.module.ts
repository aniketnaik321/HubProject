import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import { HeaderModule } from "../../components/header/header.module";
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    declarations: [NotificationsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NotificationsPageRoutingModule,
        HeaderModule,
        ScrollingModule
    ]
})
export class NotificationsPageModule {}
