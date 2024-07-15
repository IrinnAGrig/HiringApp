import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout-public',
  templateUrl: './layout-public.component.html',
  styleUrls: ['./layout-public.component.scss']
})
export class LayoutPublicComponent {
  isHome = true;
  constructor(private router: Router) {
    const url = this.router.url;

    this.isHome = url !== '/auth';
  }
  signin() {
    this.isHome = false;
    this.router.navigate(['/auth']);
  }
  goHome() {
    this.isHome = true;
    this.router.navigate(['/home']);
  }
}
