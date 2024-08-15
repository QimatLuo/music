export function initalDom() {
  return {
    bpm: document.querySelector<HTMLInputElement>("#bpm")!,
    interval: document.querySelector<HTMLInputElement>("#interval")!,
    pitch: document.querySelector<HTMLInputElement>("#pitch")!,
    sheet: document.querySelector<HTMLSelectElement>("#sheet")!,
    sound_bar: document.querySelector<HTMLInputElement>("#sound_bar")!,
    sound_meter: document.querySelector<HTMLInputElement>("#sound_meter")!,
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
