import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onCreate() {
    this.router.navigate(['Create']);
  }

  onForget() {
    this.router.navigate(['Forget']);
  }

  onLogin() {
    this.userService.loginCall(this.email, this.password).subscribe((userDetails: any) => {
      if (this.email === userDetails.data.email && this.password === userDetails.data.password) {
        window.alert("Login successfull...!");
        this.router.navigate(['Book', userDetails.token]);
      }
      else {
        window.alert("Login Failed...!");
      }
    });
  }

}
