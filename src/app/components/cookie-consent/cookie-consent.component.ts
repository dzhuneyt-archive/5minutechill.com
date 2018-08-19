import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-cookie-consent',
    templateUrl: './cookie-consent.component.html',
    styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        this.loadScript();

        window.addEventListener('load', function () {
            (<any>window).cookieconsent.initialise({
                'law': {
                    // Only show the cookie consent to countries that require it by law
                    'regionalLaw': false,
                },
                'palette': {
                    'popup': {
                        'background': 'rgb(0,0,0,0.5)',
                        'text': '#ffffff'
                    },
                    'button': {
                        'background': '#337ab7',
                        'text': '#ffffff'
                    }
                },
                'theme': 'edgeless',
                'content': {
                    'message': 'This website uses cookies to ensure you get the best online experience while browsing it.',
                    'dismiss': 'I understand',
                    'link': 'Learn more'
                }
            });
        });
    }

    public loadScript() {
        let isFound = false;
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
                isFound = true;
            }
        }

        if (!isFound) {
            const dynamicScripts = ['//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js'];

            for (let i = 0; i < dynamicScripts.length; i++) {
                const node = document.createElement('script');
                node.src = dynamicScripts [i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }

        }
    }

}
