import type { RunHelpers } from "rxjs/testing";

import { tap } from "rxjs";
import { change } from "./index";
import {
  accidentalDown,
  accidentalNone,
  accidentalUp,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  octaveH,
  octaveL,
  subdivision16n,
  subdivision2n,
  subdivision32n,
  subdivision4n,
  subdivision8n,
} from "./subject";

export default [
  ({ cold, expectObservable }) => {
    expectObservable(change).toBe(
      "aabcd-ddee-fghi-iijj-klm-mmm-nopq-nopq-rs-rs",
      {
        a: { a: 0, n: 1, o: 0, s: "4n" },
        b: { a: 1, n: 1, o: 0, s: "4n" },
        c: { a: 1, n: 1, o: 1, s: "4n" },
        d: { a: 1, n: 1, o: 1, s: "2n" },
        e: { a: 1, n: 1, o: 2, s: "2n" },
        f: { a: -1, n: 1, o: 2, s: "2n" },
        g: { a: -1, n: 2, o: 2, s: "2n" },
        h: { a: -1, n: 2, o: 1, s: "2n" },
        i: { a: -1, n: 2, o: 1, s: "4n" },
        j: { a: -1, n: 2, o: 0, s: "4n" },
        k: { a: 0, n: 2, o: 0, s: "4n" },
        l: { a: 0, n: 3, o: 0, s: "4n" },
        m: { a: 0, n: 3, o: 0, s: "8n" },
        n: { a: 0, n: 4, o: 0, s: "8n" },
        o: { a: 0, n: 5, o: 0, s: "8n" },
        p: { a: 0, n: 6, o: 0, s: "8n" },
        q: { a: 0, n: 7, o: 0, s: "8n" },
        r: { a: 0, n: 7, o: 0, s: "16n" },
        s: { a: 0, n: 7, o: 0, s: "32n" },
      },
    );

    expectObservable(
      cold("-abcd-abcd-efgh-efgh-ijk-ijk-lmno-lmno-pq-pq", {
        a: () => number1.next(),
        b: () => accidentalUp.next(),
        c: () => octaveH.next(),
        d: () => subdivision2n.next(),
        e: () => accidentalDown.next(),
        f: () => number2.next(),
        g: () => octaveL.next(),
        h: () => subdivision4n.next(),
        i: () => accidentalNone.next(),
        j: () => number3.next(),
        k: () => subdivision8n.next(),
        l: () => number4.next(),
        m: () => number5.next(),
        n: () => number6.next(),
        o: () => number7.next(),
        p: () => subdivision16n.next(),
        q: () => subdivision32n.next(),
      }).pipe(tap((f) => f())),
    );
  },
] as (<T>(x: RunHelpers) => T)[];
