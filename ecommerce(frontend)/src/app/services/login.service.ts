import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signup } from '../Datatype';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedError = new EventEmitter<boolean>(false);
  private userNameSubject = new BehaviorSubject<string | null>(null);
  loggedIn: boolean = false;

  userName$ = this.userNameSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  setUser(userName: string) {
    this.userNameSubject.next(userName);
    
  }
 
  login(data: login) {
    this.http
      .get(
        `http://localhost:8080/authenticateSignup?username=${data.username}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        if (res && res.body && res.body.length) {
          this.loggedIn = true;
          this.isLoggedIn.next(true);
          localStorage.setItem('login', JSON.stringify(res.body));
          this.router.navigate(['home']);
          // alert('Logged in successfully');
        } else {
          console.log('Incorrect password');
          this.isLoggedError.emit(true);
          this.loggedIn = false;
          alert('Logged in failed');
        }
      });
  }

  signIn(data: signup): void {
    this.http
      .post('http://localhost:8080/saveSignUpData', data, {
        observe: 'response',
      })
      .subscribe((res: any) => {
        this.loggedIn = true;
        this.isLoggedIn.next(true);
        localStorage.setItem('signUp', JSON.stringify(res.body));
        // this.router.navigate(['home']);
        console.log(res);
      });
  }
  isAuth() {
    return this.loggedIn;
  }
}
