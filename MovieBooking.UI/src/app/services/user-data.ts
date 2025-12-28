import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private loginIDSubject = new BehaviorSubject<string | null>(localStorage.getItem('loginID'));
  public loginID$ = this.loginIDSubject.asObservable();

  setLoginID(loginID: string | null) {
    localStorage.setItem('loginID', loginID || '');
    this.loginIDSubject.next(loginID);
  }

  getLoginID(): string | null {
    return this.loginIDSubject.value;
  }
}
