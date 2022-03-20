import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/Models/Cart';
import { BookService } from 'src/app/Services/book.service';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  userToken: string;
  booksInWishlist: any = [];
  wishlistItems: any = [];
  carts:any=[];

  constructor(private cartService: CartService , private router: Router , private bookService: BookService , private activatedRoute : ActivatedRoute, private wishlistService : WishlistService) { }

  ngOnInit(): void {
    this.userToken = this.activatedRoute.snapshot.paramMap.get('token');
    this.onChangeCartItems();
    this.wishlistService.getAllWishlistItems(this.userToken).subscribe(resultItems => {
      let result: any = resultItems;
      this.wishlistItems = result.data;
      if (this.wishlistItems.length < 1) {
        this.cancel();
      }
      else {
        for (let i = 0; i < this.wishlistItems.length; i++) {
          this.bookService.getById(this.wishlistItems[i].book_id, this.userToken).subscribe((books: any) => {
            let result: any = books.data;
            this.booksInWishlist[i] = result;
          });
        }
      }
    });
  }

  onChangeCartItems() {
    this.cartService.getAllForSpecificUser(this.userToken).subscribe(cartItems => {
      this.carts = cartItems;
    });
  }

  /** Adding to cart. */
  cart: Cart = new Cart(0, 0);
  onMoveToCart(bookId: number) {
    this.cart.book_id = bookId;
      this.cart.quantity = 1;
      this.cartService.addToCart(this.userToken, bookId, this.cart).subscribe((cartData:any) => {
        console.log(cartData.data);
        if(cartData.data.book_id == 0 && cartData.data.quantity == 0) {
          window.alert("You have already added this book to the cart.");
        }
        else {
          this.ngOnInit();
        }
      });
  }

  remove(bookId: number) {
    this.wishlistService.deleteItem(bookId, this.userToken).subscribe((result) => {
      this.booksInWishlist.length--;
      this.ngOnInit()
    });
  }

  /** On cancel go to books page. */
  cancel() {
    this.router.navigate(['Book', this.userToken]);
  }

  onCart() {
    this.router.navigate(['Cart' , this.userToken]);
  }

}
