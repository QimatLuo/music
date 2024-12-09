import type { RunHelpers } from "rxjs/testing";

import { tap } from "rxjs";
import { sheet } from "./index";
import { reset } from "./subject";
import { number2, octaveH, subdivision2n } from "../change/subject";
import { decrease, increase } from "../cursor/subject";

export default [
  ({ cold, expectObservable }) => {
    expectObservable(sheet).toBe("ab-c-de", {
      a: [],
      b: [{ a: 0, n: 2, o: 0, s: "4n" }],
      c: [
        { a: 0, n: 2, o: 0, s: "4n" },
        { a: 0, n: 2, o: 0, s: "2n" },
      ],
      d: [
        { a: 0, n: 2, o: 1, s: "2n" },
        { a: 0, n: 2, o: 0, s: "2n" },
      ],
      e: [{ a: 1, n: 3, o: -1, s: "16n" }],
    });

    expectObservable(
      cold("-abcdef", {
        a: () => number2.next(),
        b: () => increase.next(),
        c: () => subdivision2n.next(),
        d: () => decrease.next(),
        e: () => octaveH.next(),
        f: () => reset.next([{ a: 1, n: 3, o: -1, s: "16n" }]),
      }).pipe(tap((f) => f())),
    );
  },
] as (<T>(x: RunHelpers) => T)[];
