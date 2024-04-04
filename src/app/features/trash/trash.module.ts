import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TrashRoutingModule } from './trash-routing.module';
import { NgModule } from '@angular/core';
import { TrashComponent } from './components/trash.component';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { PreviewEntryComponent } from './components/preview-entry/preview-entry.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteForeverComponent } from './components/delete-forever/delete-forever.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    TrashRoutingModule,
    MatCardModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  declarations: [TrashComponent, PreviewEntryComponent, DeleteForeverComponent],
})
export class TrashModule {}
