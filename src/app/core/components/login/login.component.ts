import { IUser } from './../../interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthService as AuthService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { take, catchError } from 'rxjs/operators';
import { EMPTY, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('user');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.invalidLogin.next(false);
    this.authService
      .login(this.loginForm.value)
      .pipe(
        take(1),
        catchError((error) => {
          this.invalidLogin.next(true);
          console.log(error);
          return EMPTY;
        })
      )
      .subscribe((user: IUser) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['home']);
      });
  }
}
