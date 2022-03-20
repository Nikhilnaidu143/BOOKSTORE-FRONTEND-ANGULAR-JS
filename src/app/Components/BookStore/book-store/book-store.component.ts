import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/Models/Cart';
import { Wishlist } from 'src/app/Models/Wishlist';
import { BookService } from 'src/app/Services/book.service';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.scss']
})
export class BookStoreComponent implements OnInit {
  userToken: string;
  books: any = [];
  sort: string;
  searchBook: string = "";
  carts: any = [];
  wishlistItems: any = [];

  constructor(private userService: UserService, private wishlistService: WishlistService, private router: Router, private activatedRoute: ActivatedRoute, private bookService: BookService, private cartService: CartService) { }

  ngOnInit(): void {
    this.userToken = this.activatedRoute.snapshot.paramMap.get('token');
    this.onChangeCartItems();
    this.onChangeWishlistItems();
    if (this.sort == undefined) {
      this.sort = 'filter';
      this.whileIntializingPage();
    }
    else {
      this.onChange();
    }
    if (this.searchBook != "") {
      this.onInput();
    }
  }

  whileIntializingPage() {
    this.bookService.readAllCall(this.userToken).subscribe(booksData => {
      this.books = booksData;
    })
  }

  onInput() {
    this.bookService.searchBook(this.searchBook, this.userToken).subscribe(booksData => {
      this.books = booksData;
    });
  }

  onChange() {
    if (this.sort == "Normal") {
      this.whileIntializingPage();
    }
    if (this.sort == "Ascending") {
      this.bookService.sortAsc(this.userToken).subscribe(booksData => {
        this.books = booksData;
      })
    }
    if (this.sort == "Descending") {
      this.bookService.sortDesc(this.userToken).subscribe(booksData => {
        this.books = booksData;
      })
    }
  }

  onChangeCartItems() {
    this.cartService.getAllForSpecificUser(this.userToken).subscribe(cartItems => {
      this.carts = cartItems;
    });
  }

  onChangeWishlistItems() {
    this.wishlistService.getAllWishlistItems(this.userToken).subscribe(wishlistItems => {
      this.wishlistItems = wishlistItems;
    });
  }

  /** Adding to bag. */
  cart: Cart = new Cart(0, 0);
  onAddToBag(bookId: number) {
    this.cart.book_id = bookId;
    this.cart.quantity = 1;
    this.cartService.addToCart(this.userToken, bookId, this.cart).subscribe((cartData: any) => {
      if (cartData.data.book_id == 0 && cartData.data.quantity == 0) {
        window.alert("You have already added this book to the bag.");
      }
      else {
        this.ngOnInit();
      }
    });
  }

  /** Adding to wishlist. */
  wishlist: Wishlist = new Wishlist(0, 0);
  onAddToWishlist(bookId: number) {
    this.wishlist.book_id = bookId;
    this.wishlist.quantity = 1;
    this.wishlistService.addToWishlist(this.userToken, bookId, this.wishlist).subscribe((wishlistData: any) => {
      if (wishlistData.data.book_id == 0 && wishlistData.data.quantity == 0) {
        window.alert("You have already added this book to your wishlist.");
      }
      else {
        this.ngOnInit();
      }
    });
  }

  onClickWishlist() {
    this.router.navigate(['Wishlist', this.userToken]);
  }

  onClickCartLogo() {
    this.router.navigate(['Cart', this.userToken]);
  }

}

