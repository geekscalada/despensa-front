import { ToastOptions } from '@ionic/angular';

export interface IToastService {
  presentToast(opts: ToastOptions): Promise<void>;
  simpleToast(
    message: string,
    position: ToastOptions['position'],
    color: ToastOptions['color']
  ): Promise<void>;
}
