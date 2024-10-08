import { ToastOptions } from '@ionic/angular';

export interface IToastService {
  presentToast(opts: ToastOptions): Promise<void>;
  simpleToast(opts: ToastOptions): Promise<void>;
}
