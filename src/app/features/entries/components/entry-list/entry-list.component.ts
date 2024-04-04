import { Router } from '@angular/router';
import { IEntry } from './../../interfaces/entry.interface';
import { EntryService } from '../../services/entry.service';
import { Component, OnInit } from '@angular/core';
import {
  catchError,
  debounce,
  debounceTime,
  finalize,
  switchMap,
  take,
  timeInterval,
  timeout,
} from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent implements OnInit {
  entries: IEntry[] = [];
  filterTerm: Subject<string> = new Subject();
  term: string;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly entriesService: EntryService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading.next(true);
    this.entriesService
      .getAllEntries()
      .pipe(
        take(1),
        catchError((error) => {
          this.snackBar.open(error.message);
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading.next(false);
        })
      )
      .subscribe((posts: IEntry[]) => {
        this.entries = posts;
        this.entries.map((p) => (p.postedDate = new Date(p.lastUpdated)));
      });

    this.filterTerm
      .pipe(
        switchMap((term) => {
          return this.entriesService.getEntriesByFilter(term);
        }),
        debounceTime(500),
        finalize(() => {
          this.isLoading.next(false);
        })
      )
      .subscribe((result: IEntry[]) => {
        this.entries = result;
      });
  }

  getContent(content: string) {
    return `${content.slice(0, 150)}...`;
  }

  onSearch() {
    console.log(this.term);
    if (this.term && this.term.length < 3) return;
    this.isLoading.next(true);
    this.filterTerm.next(this.term);
  }

  viewEntry(id: string) {
    this.router.navigate(['entries/update-entry/', id]);
  }

  getDate(date: string) {
    return new Date(date);
  }
}
