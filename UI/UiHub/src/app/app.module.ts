import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SkeletonModule } from 'primeng/skeleton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';
import {RippleModule} from 'primeng/ripple';
import { HttpRequestInterceptor } from './core/interceptors/http-request.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';

import { ChatService } from './core/services/chat.service';
import { ChatWindowComponent } from './shared/chat-window/chat-window.component';
import { FormsModule } from '@angular/forms';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CardModule } from 'primeng/card';


@NgModule({ declarations: [
        AppComponent,
        ChatWindowComponent
    ],
    exports: [
        MessagesModule
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        SharedModule,
        SkeletonModule,
        BrowserAnimationsModule,
        MessagesModule,
        RippleModule,
        NgxSpinnerModule,
        TabViewModule,
        InputTextModule,
        ListboxModule,
        CardModule,
        FormsModule], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true,
        },
        ChatService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
