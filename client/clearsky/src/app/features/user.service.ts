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
    return this.http.post<UserForAuth>(
      '/auth/login',
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ): Observable<any> {
    return this.http.post<UserForAuth>(
      '/auth/register',
      {
        username,
        email,
        password,
        rePassword,
      },
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http.post('/auth/logout', {}, { withCredentials: true }).pipe(
      tap(() => {
        this.user = null; 
        localStorage.removeItem('token'); 
      })
    );
  }
}
