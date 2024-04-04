import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss'],
})
export class GlobalHeaderComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  goToUserProfile() {
    this.router.navigate(['/user-profile']);
  }

  addNewEntry() {
    this.router.navigate(['/entries/create-entry']);
  }
}
