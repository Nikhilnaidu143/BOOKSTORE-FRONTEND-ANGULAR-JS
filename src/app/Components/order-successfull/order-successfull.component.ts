import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order-successfull',
  templateUrl: './order-successfull.component.html',
  styleUrls: ['./order-successfull.component.scss']
})
export class OrderSuccessfullComponent implements OnInit {
  userToken:string;
  orderIds: any;

  constructor(private orderService: OrderService , private router: Router , private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.orderIds = this.orderService.retriveIds();
    this.userToken = this.activatedRoute.snapshot.paramMap.get('token');
  }

  onClick() {
    this.router.navigate([`Book/${this.userToken}`]).then(() => {
      location.reload();
    });
  }

}
