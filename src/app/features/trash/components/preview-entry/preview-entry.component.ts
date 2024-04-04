import { IEntry } from './../../../entries/interfaces/entry.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-preview-entry',
  templateUrl: './preview-entry.component.html',
  styleUrls: ['./preview-entry.component.scss'],
})
export class PreviewEntryComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { selectedEntry: IEntry }
  ) {}

  ngOnInit(): void {}
}
