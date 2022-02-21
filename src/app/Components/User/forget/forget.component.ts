import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  email:string;
  newPassword:string;

  constructor(private router: Router , private userService: UserService , private route : ActivatedRoute) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.router.navigate(['Login']);
  }

  onResetPasswprd() {
    let token : string = localStorage.getItem(this.email);
    this.userService.forgetPassword(token,this.newPassword).subscribe((result) => {
      console.log("Password changed successfully :- " , this.newPassword);
      window.alert("Password changed successfully.");
      this.router.navigate(['Login']);
    });
  }

}
