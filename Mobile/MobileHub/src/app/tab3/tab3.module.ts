import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab3PageRoutingModule } from './tab3-routing.module';

import { Tab3Page } from './tab3.page';
import { HeaderModule } from "../components/header/header.module";

@NgModule({
    declarations: [Tab3Page],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Tab3PageRoutingModule,
        HeaderModule
    ]
})
export class Tab3PageModule {}
