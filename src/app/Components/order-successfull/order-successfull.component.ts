import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-successfull',
  templateUrl: './order-successfull.component.html',
  styleUrls: ['./order-successfull.component.scss']
})
export class OrderSuccessfullComponent implements OnInit {
  order_id:any;
  userToken:string;

  constructor(private router: Router , private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.order_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userToken = this.activatedRoute.snapshot.paramMap.get('token');
  }

  onClick() {
    this.router.navigate([`Book/${this.userToken}`]);
  }

}
