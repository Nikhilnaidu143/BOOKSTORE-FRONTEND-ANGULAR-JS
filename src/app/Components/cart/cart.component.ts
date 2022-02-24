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
    this.cartService.getAllForSpecificUser(this.userToken).subscribe(resultItems => {
      let result: any = resultItems;
      this.cartItems = result.data;
      if (this.cartItems.length < 1) {
        this.cancel();
      }
      else {
        for (let i = 0; i < this.cartItems.length; i++) {
          this.bookService.getById(this.cartItems[i].book_id, this.userToken).subscribe((books: any) => {
            let result: any = books.data;
            this.booksInCart.push(result);
          });
        }
      }
    });
  }

  decreaseQuantity(bookId: number, quantity: number) {
    console.log("present quantity :- ", quantity);
    this.newQuantity = quantity - 1;
    console.log("new quantity :- ", this.newQuantity);
    if (this.newQuantity > 0) {
      this.bookService.changeQuantity(bookId, this.userToken, this.newQuantity).subscribe((result) => {
        this.reloadCurrentRoute();
      });
    }
    else {
      window.alert("OOPS! Quantity is ZERO. Removing book from cart.  ");
      this.remove(bookId);
    }
  }

  increaseQuantity(bookId: number, quantity: number) {
    console.log("present quantity :- ", quantity);
    this.newQuantity = quantity + 1;
    console.log("New quantity :- ", this.newQuantity);
    this.bookService.changeQuantity(bookId, this.userToken, this.newQuantity).subscribe((result) => {
      this.reloadCurrentRoute();
    });
  }

  /** Refresh same component. */
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  remove(book_id: number) {
    this.cartService.deleteItem(book_id, this.userToken).subscribe((result) => this.reloadCurrentRoute());
  }

  /** On cancel go to books page. */
  cancel() {
    this.router.navigate(['Book', this.userToken]);
  }

  onPlaceOrder(bookId: number) {
    this.router.navigate([`Order/${bookId}/${this.userToken}`]);
  }

}
