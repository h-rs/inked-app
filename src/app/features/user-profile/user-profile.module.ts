import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserProfileComponent } from './user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    UserProfileRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  declarations: [UserProfileComponent],
})
export class UserProfileModule {}
