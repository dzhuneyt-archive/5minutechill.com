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
                    (<any>window).gtag('config', 'UA-1704294-207', {
                        // 'page_title': 'homepage',
                        'page_path': event.urlAfterRedirects
                    });
                }
            });
        }
    }
}
