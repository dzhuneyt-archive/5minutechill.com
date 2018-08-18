import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';

class Sound {
    file: string;
    label: string;
    isPlaying = false;
    volume = 30;
    thumbnail: string = null;
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    readonly list: Sound[] = [];

    private playingAudios = new Map<string, HTMLMediaElement>();

    getVolume(item: Sound): number {
        return item.volume / 100;
    }

    getThumbnail(item: Sound): string {
        if (item.thumbnail) {
            return 'assets/images/' + item.thumbnail;
        }
    }

    constructor(
        private elRef: ChangeDetectorRef,
    ) {

        const files = [
            {
                file: '414117_makape_fireplace-light.mp3',
                label: 'Fireplace',
                thumbnail: 'lennert-de-ryck-424344-unsplash.jpg',
            },
            {
                file: 'heavy-rain-daniel_simon.mp3',
                label: 'Rain',
                thumbnail: 'max-bender-510413-unsplash.jpg',
            },
            {
                file: 'Sea Waves-SoundBible.com-946156036.mp3',
                label: 'Sea Waves',
                thumbnail: 'mourad-saadi-314319-unsplash.jpg',
            },
            {
                file: 'Perfect Thunder Storm-SoundBible.com-2056381765.mp3',
                label: 'Thunderstorm',
                thumbnail: 'sean-mcauliffe-12854-unsplash.jpg',
            },
            {
                file: 'meadowlark_daniel-simion.mp3',
                label: 'Birds',
                thumbnail: 'ridham-nagralawala-181473-unsplash.jpg',
            },
            {
                file: 'rainforest_ambience-GlorySunz-1938133500.mp3',
                label: 'Rainforest',
                thumbnail: 'tsaiga-26245-unsplash.jpg',
            },
            {
                file: 'Wind-Mark_DiAngelo-1940285615.mp3',
                label: 'Wind',
                thumbnail: 'randy-fath-736006-unsplash.jpg',
            },
            {
                file: '73716__akacie__akacie-afw2007-09.mp3',
                label: 'River',
                thumbnail: 'steve-bittinger-75582-unsplash.jpg',
            },
            {
                file: '53380__eric5335__meadow-ambience.mp3',
                label: 'Crickets',
                thumbnail: 'jon-phillips-17573-unsplash.jpg',
            },
            {
                file: 'On The Farm-SoundBible.com-278471533.mp3',
                label: 'Farm',
                thumbnail: 'patryk-sobczak-497-unsplash.jpg',
            },
        ];

        files.forEach(item => {
            const audio = new Sound();
            audio.file = item.file;
            audio.label = item.label;
            if (item.hasOwnProperty('thumbnail')) {
                audio.thumbnail = item['thumbnail'];
            }
            this.list.push(audio);
        });

    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.playingAudios.forEach(item => {
            item.pause();
        });
        this.playingAudios.clear();
    }

    play(item: Sound) {
        item.isPlaying = true;
        console.log(item, 'playing');

        if (!this.playingAudios.has(item.file)) {
            this.playingAudios.set(item.file, document.createElement('audio'));
        }

        const newAudio = this.playingAudios.get(item.file);
        newAudio.loop = true;
        newAudio.src = 'assets/audio/' + item.file;
        newAudio.load();
        newAudio.play().then(() => {
            newAudio.volume = this.getVolume(item);
        });

        this.elRef.detectChanges();
    }

    stop(item: Sound) {
        item.isPlaying = false;
        console.log(item, 'stopped');

        if (this.playingAudios.has(item.file)) {
            const audioElement = this.playingAudios.get(item.file);
            audioElement.pause();
            this.playingAudios.delete(item.file);
        }
    }

    changeVolume(item: Sound, newVolume: number) {
        item.volume = newVolume;
        if (this.playingAudios.has(item.file)) {
            const audio = this.playingAudios.get(item.file);
            audio.volume = this.getVolume(item);
        }
    }
}
