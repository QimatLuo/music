import { AssertionError, deepEqual } from "node:assert";
import {
  catchError,
  concatMap,
  defer,
  finalize,
  from,
  iif,
  map,
  mergeAll,
  of,
  zip,
} from "rxjs";
import { RunHelpers, TestScheduler } from "rxjs/testing";

console.log("----start test-----");
from([
  //"./src/change/test",
  //"./src/cursor/test",
  "./src/sheet/test",
])
  .pipe(
    concatMap((file) =>
      defer<Promise<{ default: ((helpers: RunHelpers) => void)[] }>>(
        () => import(file),
      ).pipe(
        map((x) => x.default),
        mergeAll(),
        concatMap((f, i) =>
          defer(() =>
            of(
              new TestScheduler((actual, expected) =>
                deepEqual(actual, expected),
              ).run(f),
            ),
          ).pipe(
            catchError(
              (
                e: AssertionError & { actual: unknown[]; expected: unknown[] },
              ) =>
                iif(
                  () => e.expected.length === e.actual.length,
                  zip(e.expected, e.actual).pipe(map((xs) => deepEqual(...xs))),
                  defer(() => {
                    const min = Math.min(e.expected.length, e.actual.length);
                    return of(
                      deepEqual(e.expected.slice(min), e.actual.slice(min)),
                    );
                  }),
                ).pipe(
                  finalize(() => {
                    console.log(file, i);
                  }),
                ),
            ),
          ),
        ),
      ),
    ),
  )
  .subscribe({
    complete: () => console.log("all pass"),
    error: (e: AssertionError) => console.error(e.message),
  });
