import {Component, OnInit} from '@angular/core';
import {randomSlogan} from '../../models/slogans.list';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  public slogan = randomSlogan();

  constructor() {
  }

  ngOnInit() {
  }

}
