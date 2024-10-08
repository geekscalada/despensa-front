import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { IToastService } from '../interfaces/IToastService';

@Injectable({
  providedIn: 'root',
})
export class ToastService implements IToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  async simpleToast(
    message: string,
    position: ToastOptions['position'],
    color: ToastOptions['color']
  ): Promise<void> {
    const toastOptions: ToastOptions = {
      message,
      duration: 2000,
      position,
      translucent: true,
      animated: true,
      color,
      swipeGesture: 'vertical',
    };

    const toast = await this.toastController.create(toastOptions);
    toast.present();
  }
}
