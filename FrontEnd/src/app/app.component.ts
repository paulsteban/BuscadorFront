import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  isShown: boolean = false ;
  toggleShow() {

    this.isShown = ! this.isShown;

  }
}
