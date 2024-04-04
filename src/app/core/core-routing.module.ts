import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrapperComponent } from './components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'trash',
        loadChildren: () =>
          import('../features/trash/trash.module').then((m) => m.TrashModule),
      },
      {
        path: 'entries',
        loadChildren: () =>
          import('../features/entries/entries.module').then(
            (m) => m.EntriesModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../features/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
