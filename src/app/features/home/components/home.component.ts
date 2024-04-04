import { Router } from '@angular/router';
import { IEntry } from './../../entries/interfaces/entry.interface';
import { EntryService } from './../../entries/services/entry.service';
import { IUser } from './../../../core/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: IUser;
  entries: IEntry[] = [];
  lastPostedDate: Date;
  gap: number;
  constructor(
    private readonly entryService: EntryService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);

    this.entryService
      .getAllEntries()
      .pipe(take(1))
      .subscribe((data) => {
        this.entries = data
          .sort((a, b) => {
            return +new Date(b.lastUpdated) - +new Date(a.lastUpdated);
          })
          .slice(0, 3);
        this.lastPostedDate = new Date(this.entries[0].postedDate);
        this.gap = Math.floor(
          (new Date().getTime() - this.lastPostedDate.getTime()) /
            (1000 * 3600 * 24)
        );
        console.log(this.gap);
      });
  }

  viewEntry(id: string) {
    this.router.navigate(['entries/update-entry/', id]);
  }

  getDate(date: string) {
    return new Date(date);
  }
}
