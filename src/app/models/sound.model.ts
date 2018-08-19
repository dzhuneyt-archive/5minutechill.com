export class Sound {
    file: string;
    label: string;
    isPlaying = false;
    volume = 30;
    thumbnail: string = null;

    getThumbnail() {
        return this.thumbnail ? 'assets/images/' + this.thumbnail : false;
    }

    getVolume() {
        return this.volume > 0 ? this.volume / 100 : 0;
    }
}