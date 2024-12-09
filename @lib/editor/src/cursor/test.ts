import type { RunHelpers } from "rxjs/testing";

import { tap } from "rxjs";
import { cursor } from "./index";
import { decrease, increase, reset } from "./subject";

export default [
  ({ cold, expectObservable }) => {
    expectObservable(cursor).toBe("abcd-edd", {
      a: 0,
      b: 1,
      c: 0,
      d: 5,
      e: 6,
    });

    expectObservable(
      cold("-abc-abc", {
        a: () => increase.next(),
        b: () => decrease.next(),
        c: () => reset.next(5),
      }).pipe(tap((f) => f())),
    );
  },
] as (<T>(x: RunHelpers) => T)[];
