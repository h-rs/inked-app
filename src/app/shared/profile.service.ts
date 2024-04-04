import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IUser } from './../core/interfaces/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ProfileService {
  url = `${environment.server}/user`;
  constructor(private readonly httpClient: HttpClient) {}

  updateProfile(user: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(`${this.url}`, user);
  }
}
