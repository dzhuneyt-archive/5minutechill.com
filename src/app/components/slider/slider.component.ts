import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-slider-component',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
    @Input() minValue = 0;
    @Input() maxValue = 100;

    @Input() currentValue = 50;

    @Output() onChange = new EventEmitter<number>();

    public sliderId;

    constructor() {

        this.sliderId = 'slider-' + Math.floor(100000000 + Math.random() * 900000000);
    }

    ngOnInit() {
    }

    onInput(sliderValue) {
        this.onChange.emit(<number>sliderValue);
        console.log(sliderValue);
    }
}
