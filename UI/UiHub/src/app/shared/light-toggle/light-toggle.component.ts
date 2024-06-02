import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-light-toggle',
  templateUrl: './light-toggle.component.html',
  styleUrls: ['./light-toggle.component.scss']
})
export class LightToggleComponent {
  isDarkMode = false;

  @HostBinding('class') get themeMode() {
    return this.isDarkMode ? 'dark' : 'light';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-layout-color', this.themeMode);
  }
}
