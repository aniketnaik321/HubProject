import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Tab2Page } from './tab2.page';
import { HeaderModule } from "../components/header/header.module";


@NgModule({
    declarations: [Tab2Page],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Tab2PageRoutingModule,
        ScrollingModule,
        HeaderModule
        
    ]
})
export class Tab2PageModule {}
