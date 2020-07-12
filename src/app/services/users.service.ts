import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  SERVER_URL: string = 'api';
  
  public isLoggedIn: boolean = false;


  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${this.SERVER_URL}/authentication/`, {
      username,
      password,
    });
  }
}
