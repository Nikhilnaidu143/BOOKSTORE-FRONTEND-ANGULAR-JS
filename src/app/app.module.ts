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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    ForgetComponent,
    BookStoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
