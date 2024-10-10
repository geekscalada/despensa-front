import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

// TODO: INTERCEPTOR AND MANAGE REFRESH TOKEN
// TODO: STYLES
// TODO: side menu
// TODO: check why we need to import IonicModule on every module
// TODO: tabs should share all components excep login and register!
