import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/Services/book.service';

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
  count: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.userToken = this.activatedRoute.snapshot.paramMap.get('token');
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
      console.log(this.books);
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

  onAddToBag(id: number) {
    window.alert(`ID :- ${id}`);
  }
    
}

