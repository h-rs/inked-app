import { IEntry } from '../../interfaces/entry.interface';
import { EntryService } from '../../services/entry.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-view-entry',
  templateUrl: './view-entry.component.html',
  styleUrls: ['./view-entry.component.scss'],
})
export class ViewEntryComponent implements OnInit {
  updateForm: FormGroup;
  routeParam: string;
  selectedPost: IEntry;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly EntryService: EntryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap) => {
          this.routeParam = paramMap.get('id')!;
          return this.routeParam;
        }),
        concatMap((id) => {
          return this.EntryService.getEntryById(id);
        })
      )
      .subscribe((post: any) => {
        this.selectedPost = post;
        // this.selectedPost = post.find(
        //   (post: IEntry) => post._id === this.routeParam
        // );
        this.initializeForm();
      });
  }

  private initializeForm() {
    this.updateForm = this.formBuilder.group({
      description: this.selectedPost.description,
      lastUpdateDate: undefined,
    });
  }

  updatePost() {
    console.log(this.updateForm);
  }
}
