import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    WrapperComponent,
    SidebarComponent,
    GlobalHeaderComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    CoreRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatGridListModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
  ],
})
export class CoreModule {}
