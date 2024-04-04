import { ProfileService } from './../../shared/profile.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IUser } from './../../core/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  user: IUser;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly profileService: ProfileService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.initializeForm();
  }

  private initializeForm() {
    this.userForm = this.formBuilder.group({
      id: [this.user._id],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      password: [this.user.password],
      createdDate: [new Date(this.user.createdDate)],
      lastLoggedIn: [new Date(this.user.lastLoggedIn)],
    });
    this.userForm.disable();
  }

  editForm() {
    this.userForm.enable();
  }

  updateProfile() {
    this.isLoading.next(true);
    this.profileService
      .updateProfile(this.userForm.value)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading.next(false);
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.snackBar.open('Profile saved successfully.', 'X');
        localStorage.setItem('user', JSON.stringify(data));
        this.ngOnInit();
      });
  }

  cancelProfileUpdate() {
    this.initializeForm();
  }
}
