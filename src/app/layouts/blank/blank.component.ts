import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank',
  imports: [FooterComponent, NavbarComponent,RouterOutlet],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
