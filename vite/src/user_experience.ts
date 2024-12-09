import { cursor } from "@lib/editor";

export function initalDom() {
  return {
    accidentalDown: document.querySelector<HTMLButtonElement>(".accidental-down")!,
    accidentalNone: document.querySelector<HTMLButtonElement>(".accidental-none")!,
    accidentalUp: document.querySelector<HTMLButtonElement>(".accidental-up")!,
    bpm: document.querySelector<HTMLInputElement>("#bpm")!,
    interval: document.querySelector<HTMLInputElement>("#interval")!,
    next: document.querySelector<HTMLButtonElement>(".next")!,
    number0: document.querySelector<HTMLButtonElement>(".number-0")!,
    number1: document.querySelector<HTMLButtonElement>(".number-1")!,
    number2: document.querySelector<HTMLButtonElement>(".number-2")!,
    number3: document.querySelector<HTMLButtonElement>(".number-3")!,
    number4: document.querySelector<HTMLButtonElement>(".number-4")!,
    number5: document.querySelector<HTMLButtonElement>(".number-5")!,
    number6: document.querySelector<HTMLButtonElement>(".number-6")!,
    number7: document.querySelector<HTMLButtonElement>(".number-7")!,
    octaveH: document.querySelector<HTMLButtonElement>(".octave-h")!,
    octaveL: document.querySelector<HTMLButtonElement>(".octave-l")!,
    pitch: document.querySelector<HTMLInputElement>("#pitch")!,
    previous: document.querySelector<HTMLButtonElement>(".previous")!,
    sheet: document.querySelector<HTMLPreElement>("#sheet")!,
    sound_bar: document.querySelector<HTMLInputElement>("#sound_bar")!,
    sound_meter: document.querySelector<HTMLInputElement>("#sound_meter")!,
    subdivision16: document.querySelector<HTMLButtonElement>(".subdivision-16")!,
    subdivision2: document.querySelector<HTMLButtonElement>(".subdivision-2")!,
    subdivision32: document.querySelector<HTMLButtonElement>(".subdivision-32")!,
    subdivision4: document.querySelector<HTMLButtonElement>(".subdivision-4")!,
    subdivision8: document.querySelector<HTMLButtonElement>(".subdivision-8")!,
    toggle: document.querySelector<HTMLButtonElement>("#toggle")!,
    version: document.querySelector<HTMLDivElement>("#version")!,
  };
}

export type UI = ReturnType<typeof initalDom>;

export function setupUserExperience(ui: UI) {
  ui.toggle.addEventListener("click", () => {
    ui.toggle.textContent =
      ui.toggle.textContent === "start" ? "stop" : "start";
  });
}
