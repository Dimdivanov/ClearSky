import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForAuth } from '../type/userForAuth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: UserForAuth | null = null;
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<UserForAuth>(
      `${this.apiUrl}/login`,
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
      `${this.apiUrl}/register`,
      {
        username,
        email,
        password,
        rePassword,
      },
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post('/api/logout', {});
  }
}
