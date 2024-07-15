import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.autoLogin();
  }

}
