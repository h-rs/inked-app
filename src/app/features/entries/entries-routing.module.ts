import { EntryListComponent } from './components/entry-list/entry-list.component';
import { ViewEntryComponent } from './components/view-entry/view-entry.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEntryComponent } from './components/create-entry/create-entry.component';

const routes: Routes = [
  {
    path: '',
    component: EntryListComponent,
  },
  {
    path: 'create-entry',
    component: CreateEntryComponent,
  },
  // {
  //   path: ':id',
  //   component: ViewEntryComponent,
  // },
  {
    path: 'update-entry/:id',
    component: CreateEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
