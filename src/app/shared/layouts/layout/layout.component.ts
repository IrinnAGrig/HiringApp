import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ApplicationService } from '../../services/applications/applications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  extendedSideBar = true;
  authService = inject(AuthService);
  notificationsNumber = 0;
  private notificationsCountSubscription!: Subscription;


  constructor(private applicationService: ApplicationService) {
    this.applicationService.getNumberNotifications();
    console.log('adada')
  }
  ngOnInit(): void {
    this.notificationsCountSubscription = this.applicationService.notificationsCount$.subscribe(
      count => {
        this.notificationsNumber = count;
        console.log(count)
      }
    );
  }

  ngOnDestroy(): void {
    this.notificationsCountSubscription.unsubscribe();
  }
  logout() {
    this.authService.logout();
  }
}
