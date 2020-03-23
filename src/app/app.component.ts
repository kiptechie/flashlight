import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  counter: 0;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private flashlight: Flashlight,
    private appMinimize: AppMinimize,
    public alertController: AlertController,
    public router: Router,
    public toastController: ToastController
  ) {
     // Use matchMedia to check the user preference
     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
     toggleDarkTheme(prefersDark.matches);
     // Listen for changes to the prefers-color-scheme media query
     prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
     // Add or remove the "dark" class based on if the media query matches
     function toggleDarkTheme(shouldAdd) {
       document.body.classList.toggle('dark', shouldAdd);
     }
    this.initializeApp();
    //this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
     // this.statusBar.styleDefault();
      this.statusBar.styleBlackTranslucent();
      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);
      // set status bar to white
      //this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
    });
  }

  // backButtonEvent() {
  //   document.addEventListener('backbutton', () => {
  //     this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
  //       if (outlet && outlet.canGoBack()) {
  //         outlet.pop();
  //       } else if (this.router.url === '/home') {
  //         if (this.counter === 0) {
  //           this.counter++;
  //           this.presentToast('Press BACK again to exit');
  //           setTimeout(() => { this.counter = 0; }, 3000);
  //         } else {
  //           // tslint:disable-next-line: no-string-literal
  //           navigator['app'].exitApp();
  //         }
  //       } else if (!outlet.canGoBack()) {
  //         if (this.counter === 0) {
  //           this.counter++;
  //           this.presentToast('Press BACK again to exit');
  //           setTimeout(() => { this.counter = 0; }, 3000);
  //         } else {
  //           // tslint:disable-next-line: no-string-literal
  //           navigator['app'].exitApp();
  //         }
  //       }
  //     });
  //   });
  // }

  // async presentToast(msg) {
  //   const toast = await this.toastController.create({
  //     message: msg,
  //     duration: 3000,
  //     position: 'top',
  //     color: 'dark',
  //     mode: 'ios'
  //   });
  //   toast.present();
  // }
}
