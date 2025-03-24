import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForAuth } from '../type/userForAuth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: UserForAuth | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<UserForAuth>('/auth/login', {
      email,
      password,
    });
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ): Observable<any> {
    return this.http.post<UserForAuth>('/auth/register', {
      username,
      email,
      password,
      rePassword,
    });
  }

  logout(): Observable<any> {
    return this.http.post('/auth/logout', {}).pipe(
      tap(() => {
        this.user = null;
        localStorage.removeItem('token');
      })
    );
  }
}
