import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  template: '<div id="snackbar">{{message}}</div>',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  @Input() message: string = '';
}
