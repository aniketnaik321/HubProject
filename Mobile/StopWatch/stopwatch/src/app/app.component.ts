import { Component } from '@angular/core';
import { KeepAwake } from '@capacitor-community/keep-awake';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

 

  // const keepAwake = async () => {
  //   await KeepAwake.keepAwake();
  // };
  
  // const allowSleep = async () => {
  //   await KeepAwake.allowSleep();
  // };
  
  // const isSupported = async () => {
  //   const result = await KeepAwake.isSupported();
  //   return result.isSupported;
  // };
  
  // const isKeptAwake = async () => {
  //   const result = await KeepAwake.isKeptAwake();
  //   return result.isKeptAwake;
  // };


  public async keepAwake(): Promise<void> {
    await KeepAwake.keepAwake();
  }

  public async allowSleep(): Promise<void> {
    await KeepAwake.allowSleep();
  }

}
