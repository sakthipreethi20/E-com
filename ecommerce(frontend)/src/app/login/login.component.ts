import { Component } from '@angular/core';
import { login, signup } from '../Datatype';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  constructor(private loginservice:LoginService){
  }

 showLogin:boolean=false;

 onLogin(formData: any): void {
  // Assuming your form data has username and password fields
  const { username, password } = formData;
  
  // Pass the form data to the login service
  this.loginservice.login({ username, password });

  // Optionally, set the user in the login service
  this.loginservice.setUser(username);
  
}

  signup(){
this.showLogin=true
  }
  
  onSignin(data:signup){
  this.loginservice.signIn(data);
  }

  openSignup(){
    this.showLogin=false
  }

  // onLogin(username: string) {
  //   // Your login logic here...
  //   // Assuming successful login, set the user's name
  //   this.userService.setUser(username);
  // }
}
