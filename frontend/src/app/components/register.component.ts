import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userName: string;
  password: string;

  constructor(private router: Router) {}

  onRegister() {
    const user = {
      userName: this.userName,
      password: this.password,
    };
  }
}
