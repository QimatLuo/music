import * as LS from "./localStorage";
import { create } from "./note";
import { UI } from "./type";

export function setupAudio(ui: UI) {
  const audioCtx = new window.AudioContext();
  const gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);

  let osc: OscillatorNode | null;
  ui.gain.addEventListener("input", (x) => {
    const t = x.target as HTMLInputElement
    gainNode.gain.value = +t.value
  }
  )

  ui.toggle.addEventListener("click", () => {
    if (osc) {
      osc.onended = null;
      osc.stop();
      osc = null;
    } else {
      const t = audioCtx.currentTime;
      const loop = (i: number) => {
        const b = LS.beat();
        const m = LS.tempo();
        osc = note(audioCtx, t + (60 / (LS.bpm() * m)) * i, {
          frequency: i % (b * m) === 0 ? LS.freqFirst() : LS.freqOther(),
        });
        osc.onended = () => {
          document.dispatchEvent(
            new CustomEvent("m_index", { detail: (i / m) % b | 0 }),
          );
          loop(i + 1);
        };
        osc.connect(gainNode)
      };
      loop(0);
    }
  });
}

export const MetronomeIndexEvent = new Event("m_index");

function note(
  ctx: AudioContext,
  t: number,
  config: {
    frequency: number;
  },
) {
  const osc = create(ctx);
  osc.frequency.setValueAtTime(config.frequency, ctx.currentTime);
  osc.start(t);
  osc.stop(t + 0.1);
  return osc;
}

const audioCtx = new window.AudioContext();
const o = audioCtx.createOscillator()
const g = audioCtx.createGain()
g.connect(audioCtx.destination)
o.connect(g)
g.gain.value = 1
