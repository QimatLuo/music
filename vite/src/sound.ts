import type { UI } from "./user_experience";

import {
  BehaviorSubject,
  filter,
  fromEvent,
  map,
  merge,
  share,
  Subject,
  withLatestFrom,
} from "rxjs";
import * as Tone from "tone";
import { all } from "@lib/editor";
import { toNote, toNotes } from "./editor";

const partIndex = new BehaviorSubject(0);

export function setupSound(ui: UI) {
  const { loop1, part } = setup(ui);

  const k = fromEvent<KeyboardEvent>(document, "keyup").pipe(
    map((x) => x.key),
    share(),
  );

  merge(fromEvent(ui.toggle, "click"), k.pipe(filter((x) => x === "Enter")))
    .pipe(withLatestFrom(all))
    .subscribe(([, xs]) => {
      console.log(Tone.getTransport().state)
      if (Tone.getTransport().state === "stopped") {
        Tone.getTransport().bpm.value = 120; // part bpm will not aligned if didn't reset
        toNotes(xs).forEach((x) => part.add(x));
        partIndex.next(xs.length);
      } else {
        part.clear();
      }

      Tone.getTransport().toggle();
      Tone.getTransport().bpm.rampTo(+ui.bpm.value);
    });

  partIndex.pipe(filter((x) => x === 0)).subscribe(() => {
    ui.toggle.click()
  });

  fromEvent(ui.interval, "change").subscribe(() => {
    loop1.set({
      interval: ui.interval.value,
    });
  });

  fromEvent(ui.bpm, "change").subscribe(() => {
    Tone.getTransport().bpm.rampTo(+ui.bpm.value);
  });
}

function setup(ui: UI) {
  const synth1 = new Tone.Synth({
    oscillator: {
      type: "square",
    },
  }).toDestination();
  const loop1 = new Tone.Loop((time) => {
    synth1.triggerAttackRelease(ui.sound_meter.value, 0.1, time);
  }, ui.interval.value).start("+0.1");

  const synth2 = new Tone.Synth({
    oscillator: {
      type: "square",
    },
  }).toDestination();
  const loop2 = new Tone.Loop((time) => {
    synth2.triggerAttackRelease(ui.sound_bar.value, 0.1, time);
  }, "1m").start("+0.1");

  const synth3 = new Tone.Synth().toDestination();

  const part = new Tone.Part((time, x: ReturnType<typeof toNotes>[number]) => {
    const note = toNote(x);
    synth3.triggerAttackRelease(note, x.duration, time);
    partIndex.next(partIndex.getValue() - 1);
  }, [] as any[]).start("+0.1");

  return {
    loop1,
    loop2,
    part,
    synth1,
    synth2,
    synth3,
  };
}
