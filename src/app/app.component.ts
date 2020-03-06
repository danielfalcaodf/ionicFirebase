import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  pages: {url: string, direction: string, icon: string, text: string}[];
  user: firebase.User;
  constructor(
    private authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.pages = [
      {url: '/tasks', direction: 'back', icon: 'checkmark', text: 'Tasks'},
      {url: '/tasks/create', direction: 'forward', icon: 'add', text: 'New Tasks'}
    ];
    this.authService.authState$.subscribe(user => (this.user = user));
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
