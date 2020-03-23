import { Component, OnInit } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  flashOn: boolean;
  light: string;  

  constructor(
    private flashlight: Flashlight,
    private alertController: AlertController,
    private toastController: ToastController,
    private platform: Platform,
    private appMinimize: AppMinimize,) {}

    ngOnInit() {
    this.backButtonSubscribe();
    setTimeout(() => {
      this.presentToast('Welcome to the.code_poet Expirence! \n Alot of bugs but hey! it works!!');
    }, 1500);
    }

    backButtonSubscribe() {
      this.platform.backButton.subscribe(() => {
        if (this.light == null && this.light == 'off') {
          //this.appMinimize.minimize();
          navigator['app'].exitApp();
        } else {
          this.showExitDialog();
        }
      });
    }

  switch(status) {
    this.light = status;
    const current = status;
    if (current == 'on'){
      console.log(current);
      this.backButtonSubscribe();
      this.flashlight.switchOn().then(() => {
        this.flashOn = true;
        this.backButtonSubscribe();
      });
    } else {
      console.log(current);
      this.flashlight.switchOff().then(() => {
        this.flashOn = false;
        this.backButtonSubscribe();
      });
    }
  }

  async showExitDialog() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Exit App!',
      message: 'Exiting app will switch off flash! \n A feature to run in the background is coming soon!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            alert.dismiss();
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay and exit app');
            this.flashlight.switchOff().then(() => {
              this.flashOn = false;
              navigator['app'].exitApp();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: 'success',
      mode: 'ios'
    });
    toast.present();
  }

}
