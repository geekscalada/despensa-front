import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'library',
        loadChildren: () =>
          import('../library/library.module').then((m) => m.LibraryModule),
      },
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
