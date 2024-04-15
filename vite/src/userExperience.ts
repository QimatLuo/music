import { UI } from "./type";

export function setupUserExperience(ui: UI) {
  ui.toggle.addEventListener("click", () => {
    ui.toggle.textContent = "start";
  });

  [ui.bpm, ui.beat, ui.gain, ui.tempo].forEach((x) => {
    x.addEventListener("input", () => {
      x.dataset.v = x.value;
    });
  });

  document.addEventListener("m_index", ((e: CustomEvent) => {
    ui.toggle.textContent = e.detail + 1;
  }) as EventListener);
}
