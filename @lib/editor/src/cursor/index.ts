import {
  expand,
  map,
  merge,
  of,
  shareReplay,
  startWith,
  switchMap,
  take,
} from "rxjs";
import { decrease, increase, reset } from "./subject";

export const cursor = reset.pipe(
  startWith(0),
  switchMap((x) =>
    of(x).pipe(
      expand((i) =>
        merge(increase.pipe(map(() => 1)), decrease.pipe(map(() => -1))).pipe(
          map((x) => i + x),
          take(1),
        ),
      ),
    ),
  ),
  shareReplay(1),
);
