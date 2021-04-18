import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chaka-assessment';

  public showOverlay = true;

  constructor(private router: Router) {

    router.events.subscribe((event: any) => {
      this.navigationInterceptor(event)
    })
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if(event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if(event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if(event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if(event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }

}
