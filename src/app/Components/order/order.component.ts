import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/Models/Order';
import { User } from 'src/app/Models/User';
import { BookService } from 'src/app/Services/book.service';
import { OrderService } from 'src/app/Services/order.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  id: number;
  userToken: string;
  bookData: any;

  constructor(private orderService : OrderService , private userService: UserService, private router: Router, private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  order : Order = new Order(0,0,"",0);

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userToken = this.activatedRoute.snapshot.paramMap.get('token');

    this.userDetails();
    this.bookDetails();
  }

  bookDetails() {
    this.bookService.getById(this.id, this.userToken).subscribe((result: any) => {
      this.bookData = result.data;
      this.bookData.price = this.bookData.price * this.bookData.quantity;
    });
  }

  user : User = new User("","","","","","","","");
  full_name:string;
  userDetails() {
    this.userService.decodeToken(this.userToken).subscribe((userId: any) => {
      this.userService.readById(userId, this.userToken).subscribe((userData: any) => {
        this.user.first_name = userData.data.first_name;
        this.user.email = userData.data.email;
        this.user.last_name = userData.data.last_name;
        this.full_name = this.user.first_name + " " + this.user.last_name;
      });
    });    
  }

  onCancel() {
    this.router.navigate([`Cart/${this.userToken}`]);
  }

  onCheckout() {
    if(this.order.address == "") {
      window.alert("Please enter address to checkout.")
    }
    else {
      this.order.book_id = this.id;
      this.order.price = this.bookData.price;
      this.order.quantity = this.bookData.quantity;
      this.orderService.placeOrder(this.userToken , this.order).subscribe((orderData: any) => {
        this.router.navigate([`Success/${orderData.data.id}/${this.userToken}`]);
      });
    }
  }

}
