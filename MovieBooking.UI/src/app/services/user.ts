import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginID: string, password: string) {
    return this.http.get(`${this.apiUrl}/login?loginID=${loginID}&password=${password}`);
  }

  forgotPassword(username: string) {
    return this.http.get(`${this.apiUrl}/${username}/forgot`);
  }
}
