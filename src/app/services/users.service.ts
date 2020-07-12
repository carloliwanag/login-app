import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  SERVER_URL: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${this.SERVER_URL}/authentication`, {
      username,
      password,
    });
  }
}
