import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [
    HomeRoutingModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
