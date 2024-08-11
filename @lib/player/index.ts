import * as Tone from "tone";
import type { Frequency, Subdivision } from "tone/Tone/core/type/Units";

const synth = new Tone.Synth().toDestination();

export function play(xs: Note[]) {
  xs.reduce(
    ({ time }, { n, d }) => {
      if (n) synth.triggerAttackRelease(n, d, time);
      return {
        time: time + Tone.Time(d).toSeconds(),
      };
    },
    { time: Tone.now() },
  );
}

interface Note {
  n: Frequency;
  d: Subdivision;
}
