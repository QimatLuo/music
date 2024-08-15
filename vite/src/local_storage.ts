import type { UI } from "./user_experience";

export function setupLocalStorage(ui: UI) {
  Object.values(ui).forEach((dom: HTMLElement) => {
    if (!("value" in dom)) return;
    const value = localStorage.getItem(dom.id);
    if (value != null) {
      dom.value = value;
      dom.dataset.v = value;
    }
    dom.addEventListener("change", () => {
      localStorage.setItem(dom.id, `${dom.value}`);
    });
  });
}

function number(x: string) {
  const v = localStorage.getItem(x);
  return v == null ? NaN : +v;
}

export const bpm = () => number("bpm") || 60;
export const freqFirst = () => number("freq_first") || 880;
export const freqOther = () => number("freq_other") || 440;
export const beat = () => (isNaN(number("beat")) ? 4 : number("beat"));
export const tempo = () => (isNaN(number("tempo")) ? 1 : number("tempo"));
