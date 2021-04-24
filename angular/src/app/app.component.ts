import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'angular';

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    if (this.authService.isUserPotentialAuthenticated()) {
      this.authService.sendAuthStateChangeNotification(true);
    }
  }

}
