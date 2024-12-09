import type { Note } from "@lib/editor/src/type";

import { combineLatest, filter, fromEvent, map, merge, share, tap } from "rxjs";
import * as Tone from "tone";

import { Input, all, cursor } from "@lib/editor";

import { UI } from "./user_experience";
import { sheet } from "./local_storage";

export function setupEditor(ui: UI) {
  const k = fromEvent<KeyboardEvent>(document, "keyup").pipe(
    map((x) => x.key),
    tap(console.log),
    share(),
  );

  merge(
    fromEvent(ui.accidentalDown, "click"),
    k.pipe(filter((x) => x === "b")),
  ).subscribe(() => Input.accidentalDown.next(null));

  merge(
    fromEvent(ui.accidentalNone, "click"),
    k.pipe(filter((x) => x === "n")),
  ).subscribe(() => Input.accidentalNone.next(null));

  merge(
    fromEvent(ui.accidentalUp, "click"),
    k.pipe(filter((x) => x === "#")),
  ).subscribe(() => Input.accidentalUp.next(null));

  merge(
    fromEvent(ui.next, "click"),
    k.pipe(filter((x) => x === " ")),
    k.pipe(filter((x) => x === "ArrowRight")),
  ).subscribe(() => Input.next.next(null));

  merge(
    fromEvent(ui.number0, "click"),
    k.pipe(filter((x) => x === "0")),
  ).subscribe(() => Input.number0.next(null));

  merge(
    fromEvent(ui.number1, "click"),
    k.pipe(filter((x) => x === "1")),
  ).subscribe(() => Input.number1.next(null));

  merge(
    fromEvent(ui.number2, "click"),
    k.pipe(filter((x) => x === "2")),
  ).subscribe(() => Input.number2.next(null));

  merge(
    fromEvent(ui.number3, "click"),
    k.pipe(filter((x) => x === "3")),
  ).subscribe(() => Input.number3.next(null));

  merge(
    fromEvent(ui.number4, "click"),
    k.pipe(filter((x) => x === "4")),
  ).subscribe(() => Input.number4.next(null));

  merge(
    fromEvent(ui.number5, "click"),
    k.pipe(filter((x) => x === "5")),
  ).subscribe(() => Input.number5.next(null));

  merge(
    fromEvent(ui.number6, "click"),
    k.pipe(filter((x) => x === "6")),
  ).subscribe(() => Input.number6.next(null));

  merge(
    fromEvent(ui.number7, "click"),
    k.pipe(filter((x) => x === "7")),
  ).subscribe(() => Input.number7.next(null));

  merge(
    fromEvent(ui.octaveH, "click"),
    k.pipe(filter((x) => x === "+")),
  ).subscribe(() => Input.octaveH.next(null));

  merge(
    fromEvent(ui.octaveL, "click"),
    k.pipe(filter((x) => x === "-")),
  ).subscribe(() => Input.octaveL.next(null));

  merge(
    fromEvent(ui.previous, "click"),
    k.pipe(filter((x) => x === "ArrowLeft")),
  ).subscribe(() => Input.previous.next(null));

  merge(
    fromEvent(ui.subdivision16, "click"),
    k.pipe(filter((x) => x === "l")),
  ).subscribe(() => Input.subdivision16n.next(null));

  merge(
    fromEvent(ui.subdivision2, "click"),
    k.pipe(filter((x) => x === "h")),
  ).subscribe(() => Input.subdivision2n.next(null));

  merge(
    fromEvent(ui.subdivision32, "click"),
    k.pipe(filter((x) => x === ";")),
  ).subscribe(() => Input.subdivision32n.next(null));

  merge(
    fromEvent(ui.subdivision4, "click"),
    k.pipe(filter((x) => x === "j")),
  ).subscribe(() => Input.subdivision4n.next(null));

  merge(
    fromEvent(ui.subdivision8, "click"),
    k.pipe(filter((x) => x === "k")),
  ).subscribe(() => Input.subdivision8n.next(null));

  combineLatest([all, cursor]).subscribe(([xs, i]) => {
    localStorage.setItem("sheet", JSON.stringify(xs));
    ui.sheet.replaceChildren(
      ...xs.map((x, xi) => {
        const dom = document.createElement("div");
        dom.textContent = JSON.stringify(x);
        if (i === xi) {
          dom.classList.add("current");
        }
        return dom;
      }),
    );
    ui.sheet.scrollTo(0, ui.sheet.scrollHeight);
  });

  {
    const xs = JSON.parse(localStorage.getItem("sheet") ?? "[]");
    Input.reset.next(xs);
    Input.cursor.next(xs.length);
  }
}

export function toNotes(notes: Note[]) {
  return notes.reduce(
    ({ time, xs }, n) => {
      const duration = n.s ?? "4n";
      const x = {
        ...n,
        duration,
        time,
      };
      return {
        time: time.valueOf() + Tone.Time(duration).valueOf(),
        xs: xs.concat(x),
      };
    },
    {
      time: Tone.Time("0").valueOf(),
      xs: [] as (Note & {
        time: number;
        duration: string;
      })[],
    },
  ).xs;
}

export function toNote(x: Note) {
  const midiC4 = 60;
  const m = new Map([
    [1, midiC4],
    [2, midiC4 + 2],
    [3, midiC4 + 4],
    [4, midiC4 + 5],
    [5, midiC4 + 7],
    [6, midiC4 + 9],
    [7, midiC4 + 11],
  ]);
  const semitone = m.get(x.n ?? 0);
  const octave = (x.o ?? 0) * 12;
  const accidental = x.a ?? 0;

  return !semitone ? 0 : Tone.Midi(semitone + octave + accidental).toNote();
}
