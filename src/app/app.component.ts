import { Component } from '@angular/core';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookStore';

  constructor(private cartService : CartService) {}

  ngOnInit() {
  }

}
