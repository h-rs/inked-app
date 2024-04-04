import { IUser } from './../../../../core/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, take, concatMap, filter } from 'rxjs/operators';
import { EntryService } from './../../services/entry.service';
import {
  ICreateEntryRequest,
  IEntry,
} from './../../interfaces/entry.interface';
import { IMood } from './../../interfaces/mood.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoodTypes } from '../../enums/mood.enum';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss'],
})
export class CreateEntryComponent implements OnInit {
  entryForm: FormGroup;
  options = {
    lineHeights: {
      '1.15': '1.15',
      '1.5': '1.5',
      Double: '2',
    },
  };

  currentUser: IUser;
  tags: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  availableMoods: IMood[] = [];
  moodMaps = new Map<string, string>();
  selectedMood: IMood;
  selectedEntry: IEntry = {
    title: '',
    description: '',
    lastUpdated: '',
    postedDate: new Date(),
    author: '',
    tags: [],
    mood: {
      id: '',
      selected: false,
      icon: '',
      color: '',
    },
    _id: '',
    isTrashed: false,
    trashedDate: '',
  };
  screenMode: string = 'CREATE';
  @ViewChild('froalaEditor') editor: ElementRef;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly entryService: EntryService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.initializeForm();
    this.setMoods();
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap) => {
          let id = paramMap.get('id')!;
          return id;
        }),
        filter((id) => Boolean(id)),
        concatMap((id: string) => {
          return this.entryService.getEntryById(id);
        })
      )
      .subscribe((data: IEntry) => {
        this.screenMode = 'UPDATE';
        this.selectedEntry = data;
        console.log(this.screenMode);
        this.initializeForm();
      });
  }

  saveEntry() {
    console.log(this.entryForm);
    if (this.screenMode === 'CREATE') {
      const request: ICreateEntryRequest = {
        description: this.entryForm.get('description')?.value?.trim(),
        title: this.entryForm.get('title')?.value?.trim(),
        postedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        mood: this.entryForm.get('mood')?.value,
        tags: this.tags,
        author: this.currentUser.email,
        isTrashed: false,
        trashedDate: '',
      };
      this.entryService
        .saveEntry(request)
        .pipe(
          take(1),
          catchError((error) => {
            console.log(error);
            return EMPTY;
          })
        )
        .subscribe((res) => {
          console.log(res);
          this.snackBar.open('Entry saved successfully.', 'x');
          this.ngOnInit();
        });
    } else {
      const request: IEntry = {
        _id: this.entryForm.get('id')?.value,
        description: this.entryForm.get('description')?.value?.trim(),
        title: this.entryForm.get('title')?.value?.trim(),
        postedDate: this.entryForm.get('postedDate')?.value,
        lastUpdated: new Date().toISOString(),
        mood: this.entryForm.get('mood')?.value,
        tags: this.entryForm.get('tags')?.value,
        author: this.currentUser.email,
        isTrashed: false,
        trashedDate: '',
      };

      this.entryService
        .updateEntry(request)
        .pipe(
          take(1),
          catchError((error) => {
            console.log(error);
            return EMPTY;
          })
        )
        .subscribe((data: IEntry) => {
          this.snackBar.open('Entry saved successfully.', 'x');
          this.selectedEntry = data;
          this.initializeForm();
        });
    }
  }

  setMoods() {
    this.availableMoods = [
      {
        id: MoodTypes.SATISFIED,
        icon: 'sentiment_very_satisfied',
        color: 'accent',
        selected: false,
      },
      {
        id: MoodTypes.DISSATISFIED,
        icon: MoodTypes.DISSATISFIED,
        color: 'accent',
        selected: false,
      },
      {
        id: MoodTypes.NEUTRAL,
        icon: MoodTypes.NEUTRAL,
        color: 'accent',
        selected: false,
      },
      {
        id: MoodTypes.LOVE,
        icon: MoodTypes.LOVE,
        color: 'accent',
        selected: false,
      },
      {
        id: MoodTypes.LIGHTBULB,
        icon: MoodTypes.LIGHTBULB,
        color: 'accent',
        selected: false,
      },
    ];
  }

  updateMood(moodId: string, moodSelected: boolean) {
    this.availableMoods.map((m) => {
      m.color = 'accent';
      m.selected = false;
    });
    let mood = this.availableMoods.find((m) => m.id === moodId);
    if (mood) {
      mood.selected = moodSelected;
      if (moodSelected) {
        this.entryForm.get('mood')?.setValue(mood);
        mood.color = 'primary';
      } else {
        mood.color = 'accent';
      }
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.tags = this.entryForm.get('tags')?.value;
    if (value && this.tags.indexOf(value) === -1) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  initializeForm() {
    this.entryForm = this.formBuilder.group({
      id: [this.selectedEntry._id],
      description: [this.selectedEntry.description, [Validators.required]],
      title: [this.selectedEntry.title, [Validators.required]],
      postedDate: [this.selectedEntry.postedDate],
      lastUpdated: [this.selectedEntry.lastUpdated],
      mood: [this.selectedEntry?.mood],
      tags: [this.selectedEntry.tags],
      author: [this.selectedEntry.author],
    });

    if (this.screenMode === 'UPDATE') {
      this.updateMood(this.selectedEntry.mood.id, true);
    }
  }

  trashEntry() {
    this.entryService
      .trashEntry(this.selectedEntry)
      .pipe(take(1))
      .subscribe((data: IEntry) => {
        this.snackBar.open('Entry trashed successfully.', 'X');
        setTimeout(() => {
          this.router.navigate(['entries']);
        }, 2000);
      });
  }
}
