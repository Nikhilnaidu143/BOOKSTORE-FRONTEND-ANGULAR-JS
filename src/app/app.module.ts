import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/User/login/login.component';
import { CreateComponent } from './Components/User/create/create.component';
import { FormsModule } from '@angular/forms';
import { ForgetComponent } from './Components/User/forget/forget.component';
import { HttpClientModule } from '@angular/common/http';
import { BookStoreComponent } from './Components/BookStore/book-store/book-store.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderComponent } from './Components/order/order.component';
import { OrderSuccessfullComponent } from './Components/order-successfull/order-successfull.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    ForgetComponent,
    BookStoreComponent,
    CartComponent,
    OrderComponent,
    OrderSuccessfullComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
