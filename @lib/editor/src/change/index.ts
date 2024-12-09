import {
  combineLatest,
  from,
  map,
  merge,
  mergeAll,
  scan,
  share,
  shareReplay,
  startWith,
} from "rxjs";
import * as S from "./subject";

const accidental = merge(
  S.accidentalDown.pipe(map(() => -1 as const)),
  S.accidentalNone.pipe(map(() => 0 as const)),
  S.accidentalUp.pipe(map(() => 1 as const)),
);

const number = from([0, 1, 2, 3, 4, 5, 6, 7] as const).pipe(
  map((x) => S[`number${x}`].pipe(map(() => x))),
  mergeAll(),
);

const octave = merge(
  S.octaveH.pipe(map(() => 1)),
  S.octaveL.pipe(map(() => -1)),
).pipe(
  scan((a, b) => a + b, 0),
  share(),
);

const subdivision = from(["2n", "4n", "8n", "16n", "32n"] as const).pipe(
  map((x) => S[`subdivision${x}`].pipe(map(() => x))),
  mergeAll(),
);

export const change = combineLatest({
  a: accidental.pipe(startWith(0 as const)),
  n: number.pipe(startWith(1 as const)),
  o: octave.pipe(startWith(0)),
  s: subdivision.pipe(startWith("4n" as const)),
}).pipe(shareReplay(1));
