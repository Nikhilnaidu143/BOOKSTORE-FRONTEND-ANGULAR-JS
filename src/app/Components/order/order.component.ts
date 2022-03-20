import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/Models/Order';
import { User } from 'src/app/Models/User';
import { BookService } from 'src/app/Services/book.service';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  userToken: string;
  booksData: any = [];
  cartItems: any = [];
  tempBooksData: any = [];
  address: string;
  orderIds: any;
  totalPrice: any = 0;

  constructor(private cartService: CartService, private orderService: OrderService, private userService: UserService, private router: Router, private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userToken = this.activatedRoute.snapshot.paramMap.get('token');

    this.userDetails();
    this.bookDetails();
  }

  bookDetails() {
    this.userToken = this.activatedRoute.snapshot.paramMap.get('token');
    this.cartService.getAllForSpecificUser(this.userToken).subscribe((resultItems: any) => {
      this.cartItems = resultItems.data;
      for (let i = 0; i < this.cartItems.length; i++) {
        this.bookService.getById(this.cartItems[i].book_id, this.userToken).subscribe((books: any) => {
          this.booksData[i] = books.data;
          this.booksData[i].quantity = this.cartItems[i].quantity;
          this.booksData[i].price = this.booksData[i].price * this.booksData[i].quantity;
          this.totalPrice += this.booksData[i].price;
        });
      }
    });
  }

  user: User = new User("", "", "", "", "", "", "", "");
  full_name: string;
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
    for (let i = 0; i < this.cartItems.length; i++) {
      this.bookService.getById(this.cartItems[i].book_id, this.userToken).subscribe((books: any) => {
        this.tempBooksData[i] = books.data;
        this.tempBooksData[i].quantity = this.cartItems[i].quantity;
        this.tempBooksData[i].price = this.tempBooksData[i].price * this.tempBooksData[i].quantity;

        var order: Order = new Order(0, 0, "", 0);
        order.address = this.address;
        if (order.address == "" || order.address == undefined) {
          window.alert("Please enter address to checkout.");
        }
        else {
          order.book_id = this.tempBooksData[i].id;
          order.price = this.tempBooksData[i].price;
          order.quantity = this.tempBooksData[i].quantity;
          this.orderService.placeOrder(this.userToken, order).subscribe((orderData: any) => {
            this.orderIds = orderData.data.id;
            this.orderService.saveOrderIds(this.orderIds);
          });
        }
        if ((i == (this.cartItems.length - 1)) && order.address !== "" && order.address !== undefined) {
          this.router.navigate([`Success/${this.userToken}`]);
        }
      });
    }
  }

}
