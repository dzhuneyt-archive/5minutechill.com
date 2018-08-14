import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './components/list/list.component';
import {SliderComponent} from './components/slider/slider.component';

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
        SliderComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
    ],
    bootstrap: [AppComponent],
    providers: [
        //
    ],
})
export class AppModule {
}
