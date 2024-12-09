import {
  expand,
  map,
  of,
  skip,
  startWith,
  switchMap,
  take,
  withLatestFrom,
} from "rxjs";
import { change } from "../change";
import { cursor } from "../cursor";
import { reset } from "./subject";

export const sheet = reset.pipe(
  startWith([]),
  switchMap((_) =>
    of(_).pipe(
      expand((xs) =>
        change.pipe(withLatestFrom(cursor)).pipe(
          skip(1),
          map(([x, i]) => xs.slice(0, i).concat(x, xs.slice(i + 1))),
          take(1),
        ),
      ),
    ),
  ),
);
