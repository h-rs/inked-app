import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = `${environment.server}/auth`;
  constructor(private readonly htpClient: HttpClient) {}

  login(user: IUser): Observable<IUser> {
    return this.htpClient.post<IUser>(`${this.baseUrl}/login`, user);
  }

  signUp(newUser: IUser): Observable<IUser> {
    return this.htpClient.post<IUser>(`${this.baseUrl}/sign-up`, newUser);
  }
}
