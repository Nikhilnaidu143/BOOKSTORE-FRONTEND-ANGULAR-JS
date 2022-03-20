import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/Services/book.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userToken: string;
  booksInCart: any = [];
  cartItems: any = [];
  newQuantity: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bookService: BookService, private cartService: CartService) { }

  ngOnInit(): void {
    this.userToken = this.activatedRoute.snapshot.paramMap.get('token');
    this.cartService.getAllForSpecificUser(this.userToken).subscribe((resultItems:any) => {
      this.cartItems = resultItems.data;      
      if (this.cartItems.length < 1) {
        this.cancel();
      }
      else {
        for (let i = 0; i < this.cartItems.length; i++) {
          this.bookService.getById(this.cartItems[i].book_id, this.userToken).subscribe((books: any) => {
            let result: any = books.data;
            this.booksInCart[i] = result;
            this.booksInCart[i].quantity = this.cartItems[i].quantity;
          });
        }
      }
    });
  }

  decreaseQuantity(bookId: number, quantity: number) {
    this.newQuantity = quantity - 1;
    if (this.newQuantity > 0) {
      this.cartService.updateQuantity(bookId, this.userToken, this.newQuantity).subscribe((result) => {
        this.ngOnInit();
      });
    }
    else {
      window.alert("OOPS! Quantity is ZERO. Removing book from cart.  ");
      this.remove(bookId);
    }
  }

  increaseQuantity(bookId: number, quantity: number) {
    this.newQuantity = quantity + 1;
    this.cartService.updateQuantity(bookId, this.userToken, this.newQuantity).subscribe((result) => {
      this.ngOnInit();
    });
  }

  remove(book_id: number) {
    this.cartService.deleteItem(book_id, this.userToken).subscribe((result) => {
      this.booksInCart.length--;
      this.ngOnInit()
    });
  }

  /** On cancel go to books page. */
  cancel() {
    this.router.navigate(['Book', this.userToken]);
  }

  onPlaceOrder() {
    this.router.navigate([`Order/${this.userToken}`]);
  }

}
