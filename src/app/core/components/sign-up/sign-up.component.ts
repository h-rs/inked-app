import { Router } from '@angular/router';
import { AuthService } from './../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { take, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signUp() {
    localStorage.removeItem('user');
    this.authService
      .signUp(this.signUpForm.value)
      .pipe(
        take(1),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/home']);
      });
  }
}
