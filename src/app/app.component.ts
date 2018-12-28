import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private router: Router) {
        if (environment.production) {
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    // Prepare the page for Google Analytics tracking
                    // Also track a "hit" to the current URL
                    (<any>window).gtag('config', 'UA-1704294-207', {
                        // 'page_title': 'homepage',
                        'page_path': event.urlAfterRedirects
                    });

                    // Prepare Google Ads event conversion tracking (global code)
                    (<any>window).gtag('config', 'AW-837475263');
                }
            });
        }
    }
}
