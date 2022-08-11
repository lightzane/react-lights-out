import { Howl } from 'howler';
import audioWinner from './pristine-609.mp3';
import audioMove from './light-562.mp3';
import audioReset from './direct-545.mp3';

const volume = 0.5;

export const SOUND = {
    Winner: new Howl({
        src: [audioWinner],
        volume
    }),

    Move: new Howl({
        src: [audioMove],
        volume
    }),

    Reset: new Howl({
        src: [audioReset],
        volume
    })
};