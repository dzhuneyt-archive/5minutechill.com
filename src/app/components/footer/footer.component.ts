import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    poweredByClicked() {
        (<any>window).gtag('event', 'click', {
            event_category: 'footer',
            event_label: 'dzhuneyt.com',
        });
        console.log('Powered By Clicked');
    }

}
