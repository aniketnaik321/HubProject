import { Component, OnInit } from '@angular/core';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { NativeAudio } from '@capacitor-community/native-audio'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    NativeAudio.preload({
      assetId: "start",
      assetPath: "public/assets/sounds/start.mp3",
      audioChannelNum: 1,
      isUrl: false
    });

    NativeAudio.preload({
      assetId: "running",
      assetPath: "public/assets/sounds/running.mp3",
      audioChannelNum: 1,
      isUrl: false
    });
    this.seconds = this.timeLimit;
    this.minuteDisplay = this.formatNumber(Math.floor(this.seconds / 60));
    this.secondsDisplay = this.formatNumber(this.seconds % 60);

  }
  time: Date = new Date();
  interval: any;
  minuteDisplay: string = '00';

  secondsDisplay: string = '00';
  seconds: number = 0;
  running: boolean = false;
  timeLimit: number = 60; // Default time limit
  timeOptions: any[] = [
    { displayText: '30 seconds', value: 30 },
    { displayText: '1 minute', value: 60 },
    { displayText: '1 minute 30 seconds', value: 90 },
    { displayText: '2 minutes', value: 120 },
    { displayText: '2 minutes 30 seconds', value: 150 },
    { displayText: '3 minutes', value: 180 }
  ]
    ; // Options for dropdown

  startTimer() {
    if (!this.running) {
      //this.time = new Date();
      // this.time.setHours(0, 0, 0, 0);
      //this.time.setMinutes(this.time.getMinutes() + this.timeLimit / 60);

      this.interval = setInterval(() => {
        this.seconds -= 1
        this.minuteDisplay = this.formatNumber(Math.floor(this.seconds / 60));
        this.secondsDisplay = this.formatNumber(this.seconds % 60);
        console.log(this.time.toTimeString());

        // Check if time has run out
        if (this.seconds <= 0) {
          this.stopTimer();
        }
      }, 1000);

      this.running = true;



      NativeAudio.play({
        assetId: 'start',
        // time: 6.0 - seek time
      });

      NativeAudio.play({
        assetId: 'running',
         time: 0
      });

      NativeAudio.loop({
        assetId: 'running',

        // time: 6.0 - seek time
      });
    }
  }

  formatNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }


  stopTimer() {
    clearInterval(this.interval);
    NativeAudio.play({
      assetId: 'start',
      // time: 6.0 - seek time
    });

    NativeAudio.stop({
      assetId: 'running',
      // time: 6.0 - seek time
    });
    this.running = false;
  }

  resetTimer() {

    this.seconds = this.timeLimit;
    this.minuteDisplay = this.formatNumber(Math.floor(this.seconds / 60));
    this.secondsDisplay = this.formatNumber(this.seconds % 60);
    this.stopTimer();


  }


  public async keepAwake(): Promise<void> {
    await KeepAwake.keepAwake();
  }

  public async allowSleep(): Promise<void> {
    await KeepAwake.allowSleep();
  }


}
