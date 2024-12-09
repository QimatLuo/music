import type { Subdivision, Time } from "tone/Tone/core/type/Units";
import * as Tone from "tone";

type nLetter = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
type Accidental = "bb" | "b" | "" | "#" | "x";
type nOctave = "...." | "..." | ".." | "." | "";
export type nNote = `${nOctave}${Accidental}${nLetter}${nOctave}`;

const midiC4 = 60;
const m = new Map([
  ["1", midiC4],
  ["2", midiC4 + 2],
  ["3", midiC4 + 4],
  ["5", midiC4 + 7],
  ["6", midiC4 + 9],
  ["7", midiC4 + 11],
]);

const s =
  (d1: Time) =>
  (N: nNote, d2: Subdivision = "0"): Notation => {
    if (typeof N !== "string") {
      console.log(N);
    }
    const [_, octaveL, accidental, number, octaveH] =
      N.match(/(\.?)(.?)(\d)(\.?)/) ?? [];
    const octave = octaveL.length * -12 + octaveH.length * 12;
    const acc = accidental === "#" ? 1 : accidental === "b" ? -1 : 0;
    const semitone = m.get(number);
    const midi = !semitone ? null : semitone + acc + octave;

    return {
      d: Tone.Time(d1).valueOf() + Tone.Time(d2).valueOf(),
      midi,
    };
  };

export const n2 = s("2n");
export const n4 = s("4n");
export const n8 = s("8n");
export const n16 = s("16n");
export const n32 = s("32n");
export const n64 = s("64n");
export const n128 = s("128n");
export const n256 = s("256n");

export const nd2 = s("2n.");
export const nd4 = s("4n.");
export const nd8 = s("8n.");
export const nd16 = s("16n.");
export const nd32 = s("32n.");
export const nd64 = s("64n.");
export const nd128 = s("128n.");
export const nd256 = s("256n.");

export const t2 = s("2t");
export const t4 = s("4t");
export const t8 = s("8t");
export const t16 = s("16t");
export const t32 = s("32t");
export const t64 = s("64t");
export const t128 = s("128t");
export const t256 = s("256t");

export function toNotes(notes: Notation[]) {
  return notes.reduce(
    ({ time, xs }, n) => {
      const { d } = n;
      const x = {
        ...n,
        duration: n.d,
        time,
      };
      return {
        time: time.valueOf() + Tone.Time(d).valueOf(),
        xs: xs.concat(x),
      };
    },
    {
      time: Tone.Time("0").valueOf(),
      xs: [] as ParsedNote[],
    },
  ).xs;
}

export interface Notation {
  d: Time;
  midi: number | null;
}

export interface ParsedNote extends Notation {
  duration: Time;
  time: number;
}
