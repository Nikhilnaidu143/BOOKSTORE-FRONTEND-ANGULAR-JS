import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  fNameError: string;

  constructor(private router: Router, private userService: UserService) { }

  user: User = new User("", "","", "", "", "", "", "");

  ngOnInit(): void {
  }

  onCancel() {
    this.router.navigate(['Login']);
  }

  onCreate() {
    this.userService.postCall(this.user).subscribe((userDetails:any) => console.log(userDetails));
    this.router.navigate(['Login']);
  }

  onFirstName() {
    const nameRegex = /^[A-Z]{1}[A-Za-z]{2,}/;
    if (this.user.first_name === "") {
      return this.fNameError = " ";
    }
    else if (nameRegex.test(this.user.first_name)) {
      return this.fNameError = " ";
    }
    else {
      return this.fNameError = "Invalid First Name.";
    }
  }

}
