import { AuthService } from 'src/app/core/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-logout-button',
  template: `
  <ion-buttons >
    <ion-button (click)="logout()">
      <ion-icon slot="icon-only" name="exit"></ion-icon>
    </ion-button>
  </ion-buttons>
  `

})
export class LogoutButtonComponent implements OnInit {
  @Input() menu: string;
  constructor(private authService: AuthService, private navCtrl: NavController,
              private menuCtrl: MenuController, private overlayService: OverlayService) {

  }
  async ngOnInit(): Promise<void> {
   if (! await this.menuCtrl.isEnabled(this.menu)) {
      this.menuCtrl.enable(true, this.menu);
   }
  }

  async logout() {
    await this.overlayService.alert({
      message: 'Você quer sair ?',
      buttons: [
        {
          text: 'sim',
          handler: async () => {
            await this.authService.logout();
            await this.menuCtrl.enable(false, this.menu);
            this.navCtrl.navigateRoot('/login');
          }
        },
        'Não'
      ]
    });
  }

}
