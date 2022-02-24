import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookStoreComponent } from './Components/BookStore/book-store/book-store.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderSuccessfullComponent } from './Components/order-successfull/order-successfull.component';
import { OrderComponent } from './Components/order/order.component';
import { CreateComponent } from './Components/User/create/create.component';
import { ForgetComponent } from './Components/User/forget/forget.component';
import { LoginComponent } from './Components/User/login/login.component';


const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Create', component: CreateComponent },
  { path: 'Forget', component: ForgetComponent },
  { path: 'Book/:token', component: BookStoreComponent},
  { path: 'Cart/:token', component: CartComponent},
  { path: 'Order/:id/:token', component: OrderComponent},
  { path: 'Success/:id/:token', component: OrderSuccessfullComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
