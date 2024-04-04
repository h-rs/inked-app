import { DeleteForeverComponent } from './delete-forever/delete-forever.component';
import { PreviewEntryComponent } from './preview-entry/preview-entry.component';
import { IEntry } from './../../entries/interfaces/entry.interface';
import { EntryService } from './../../entries/services/entry.service';
import { Component, OnInit } from '@angular/core';
import { take, filter, concatMap, finalize } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent implements OnInit {
  trashedEntries: IEntry[] = [];
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly entryService: EntryService,
    private readonly bottomSheet: MatBottomSheet,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading.next(true);
    this.entryService
      .getTrashedEntries()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading.next(false);
        })
      )
      .subscribe((data: IEntry[]) => {
        this.trashedEntries = data;
      });
  }

  restore(selectedEntry: IEntry) {
    this.isLoading.next(true);
    this.entryService
      .restoreEntry(selectedEntry)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading.next(false);
        })
      )
      .subscribe((data) => {
        console.log('restore output', data);
        this.snackBar.open('Entry restored.', 'X');
        this.ngOnInit();
      });
  }

  preview(selectedEntry: IEntry) {
    this.bottomSheet.open(PreviewEntryComponent, {
      data: { selectedEntry },
    });
  }

  openDialog(selectedEntry: IEntry) {
    const dialogRef = this.dialog.open(DeleteForeverComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => Boolean(res)),
        concatMap(() => {
          this.isLoading.next(true);
          return this.entryService.deleteEntry(selectedEntry._id);
        }),
        take(1),
        finalize(() => {
          this.isLoading.next(false);
        })
      )
      .subscribe(() => {
        this.snackBar.open('Entry deleted forever.', 'X');
      });
  }

  getTrashedDate(dateString: string): Date {
    return new Date(dateString);
  }
}
