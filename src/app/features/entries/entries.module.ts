import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { PostsRoutingModule } from './entries-routing.module';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { ViewEntryComponent } from './components/view-entry/view-entry.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEntryComponent } from './components/create-entry/create-entry.component';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    PostsRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    MatChipsModule,
    MatExpansionModule,
    MatTableModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  declarations: [ViewEntryComponent, CreateEntryComponent, EntryListComponent],
})
export class EntriesModule {}
