import { Component } from '@angular/core';
import { ApplicationService } from '../shared/services/applications/applications.service';
import { Notifications } from '../shared/services/applications/notifications.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifications: Notifications[] = [];
  isLoading = true;

  constructor(private applicationService: ApplicationService, private router: Router) {
    this.applicationService.getNotificationFromNewApplications().subscribe(res => {
      this.notifications = res;
      this.isLoading = false;
    })
  }

  goToDetails(id: string) {
    this.router.navigate(['/applications/' + id]);
  }
}
