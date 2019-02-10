import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Sound} from '../../models/sound.model';
import {environment} from '../../../environments/environment';
import {Meta, Title} from '@angular/platform-browser';
import {BackendService} from '../../backend.service';
import {randomSlogan} from '../../models/slogans.list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  readonly list: Sound[] = [];

  private playingAudios = new Map<string, HTMLMediaElement>();

  constructor(
    private elRef: ChangeDetectorRef,
    private title: Title,
    private meta: Meta,
    private backend: BackendService,
  ) {
  }

  ngOnInit() {
    this.populateSoundsList();

    this.title.setTitle('5 Minute Chill - Relaxing sounds for stress relief');

    this.meta.addTag({name: 'description', 'content': randomSlogan()}, true);
  }

  ngOnDestroy() {
    this.playingAudios.forEach(item => {
      try {
        item.pause();
      } catch (e) {
      }
    });
    this.playingAudios.clear();
  }

  private populateSoundsList(): void {
    this.backend.request('public/sounds.json').subscribe((soundsData: Sound[]) => {
      soundsData.forEach(item => {
        const audio = new Sound();
        audio.file = item.file;
        audio.label = item.label;
        if (item.hasOwnProperty('thumbnail')) {
          audio.thumbnail = item['thumbnail'];
        }
        if (item.hasOwnProperty('volume')) {
          audio.volume = item['volume'];
        }
        this.list.push(audio);
      });
    });

  }

  play(item: Sound) {
    item.isPlaying = true;
    console.log(item, 'playing');

    if (!this.playingAudios.has(item.file)) {
      this.playingAudios.set(item.file, document.createElement('audio'));
    }

    const newAudio = this.playingAudios.get(item.file);
    newAudio.volume = item.getVolume();
    newAudio.loop = true;
    newAudio.src = 'assets/audio/' + item.file;
    newAudio.load();
    newAudio.volume = item.getVolume();
    newAudio.play().then(() => {
      newAudio.volume = item.getVolume();
    });

    this.elRef.detectChanges();

    if (environment.production) {
      // Track a Google Analytics event
      (<any>window).gtag('event', 'played', {
        event_category: 'sound',
        event_label: item.label,
      });

      // 5minutechill - sound played conversion
      (<any>window).gtag('event', 'conversion', {
        'send_to': 'AW-837475263/nHwLCM7htpIBEL-3q48D',
        'event_callback': () => {
          console.log('Google Ads conversion success');
        },
      });
    }
  }

  stop(item: Sound) {
    item.isPlaying = false;
    console.log(item, 'stopped');

    if (this.playingAudios.has(item.file)) {
      const audioElement = this.playingAudios.get(item.file);
      audioElement.pause();
      this.playingAudios.delete(item.file);
    }

    if (environment.production) {
      (<any>window).gtag('event', 'stopped', {
        event_category: 'sound',
        event_label: item.label,
      });
    }
  }

  changeVolume(item: Sound, newVolume: number) {
    item.volume = newVolume;
    if (this.playingAudios.has(item.file)) {
      const audio = this.playingAudios.get(item.file);
      audio.volume = item.getVolume();
    }
  }
}
