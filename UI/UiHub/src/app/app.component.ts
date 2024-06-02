import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UiHub';
  firebaseConfig:any = {
    apiKey: "AIzaSyDpOwXarnu2T8389I0u_miCYp0SSlmHYic",
    authDomain: "globalsoftsuite-1703555432642.firebaseapp.com",
    projectId: "globalsoftsuite-1703555432642",
    storageBucket: "globalsoftsuite-1703555432642.appspot.com",
    messagingSenderId: "1019158484850",
    appId: "1:1019158484850:web:02a980a4f5dc4d9fcbefeb",
    measurementId: "G-BR8D9G3ZCK"
  };
  // Initialize Firebase
  app:any
  analytics:any;
  

  constructor(private primengConfig: PrimeNGConfig) {
    // Initialize Firebase
  this.app = initializeApp(this.firebaseConfig);
  this.analytics = getAnalytics(this.app);
  }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    isChatWindowVisible = false;

  toggleChatWindow() {
    this.isChatWindowVisible = !this.isChatWindowVisible;
  }
}
