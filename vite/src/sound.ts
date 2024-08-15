import type { UI } from "./user_experience";
import { First, GetBetter, Romance, toNotes, ParsedNote } from "@lib/sheets";
import * as Tone from "tone";

const m = new Map([
  ["first", toNotes(First)],
  ["get_better", toNotes(GetBetter)],
  ["romance", toNotes(Romance)],
]);

export function setupSound(ui: UI) {
  const { loop1, part } = setup(ui);

  ui.toggle.addEventListener("click", () => {
    ui.interval.addEventListener("change", () => {
      loop1.set({
        interval: ui.interval.value,
      });
    });

    if (Tone.getTransport().state === "stopped") {
      Tone.getTransport().bpm.value = 120; // part bpm will not aligned if didn't reset
      (m.get(ui.sheet.value) ?? []).forEach((x) => part.add(x));
    } else {
      part.clear();
    }

    Tone.getTransport().toggle();
    Tone.getTransport().bpm.rampTo(+ui.bpm.value);
  });

  ui.bpm.addEventListener("change", () => {
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

  //let i = sheet.length;
  const part = new Tone.Part((time, x: ParsedNote) => {
    const note = x.midi ? Tone.Midi(x.midi + +ui.pitch.value).toNote() : 0;
    synth3.triggerAttackRelease(note, x.duration, time);
    //i--;
    //if (!i) Tone.getTransport().stop(time);
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
