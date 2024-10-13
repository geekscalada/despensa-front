import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

// TODO: Check http service and all services and components that use it directly or indirectly to check the new sintaxis using obserevable
// TODO: check handling errors in this new sintaxis
// TODO: INTERCEPTOR AND MANAGE REFRESH TOKEN, implement!
// TODO: TODO, implement status 0 error also in the interceptor
// TODO: STYLES
// TODO: side menu
// TODO: check why we need to import IonicModule on every module
// TODO: tabs should share all components excep login and register!
// TODO: different environments
