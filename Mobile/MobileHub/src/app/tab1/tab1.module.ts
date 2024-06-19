import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { Tab1Page } from './tab1.page';
import { HeaderModule } from "../components/header/header.module";

@NgModule({
    declarations: [Tab1Page],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Tab1PageRoutingModule,
        HeaderModule
    ]
})
export class Tab1PageModule {}
