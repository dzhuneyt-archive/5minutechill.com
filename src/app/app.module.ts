import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './components/list/list.component';
import {SliderComponent} from './components/slider/slider.component';
import {IntroComponent} from './components/intro/intro.component';
import {FooterComponent} from './components/footer/footer.component';
import {CookieConsentComponent} from './components/cookie-consent/cookie-consent.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SliderComponent,
    IntroComponent,
    FooterComponent,
    CookieConsentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    //
  ],
})
export class AppModule {
}
