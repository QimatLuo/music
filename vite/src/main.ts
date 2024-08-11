import "./style.css";
import { setupAudio } from "./audio.ts";
import { UI } from "./type";
import { setupLocalStorage } from "./localStorage.ts";
import { setupUserExperience } from "./userExperience.ts";
import { play } from "@lib/player";
import { First } from "@lib/sheets";

window["first"] = (start?: number, end?: number) =>
  play(First.slice(start, end));

document.querySelector<HTMLDivElement>("#app")!.innerHTML =
  document.getElementById("tpl")!.innerHTML;

const ui: UI = {
  beat: document.querySelector<HTMLInputElement>("#beat")!,
  bpm: document.querySelector<HTMLInputElement>("#bpm")!,
  freq_first: document.querySelector<HTMLInputElement>("#freq_first")!,
  freq_other: document.querySelector<HTMLInputElement>("#freq_other")!,
  gain: document.querySelector<HTMLInputElement>("#gain")!,
  tempo: document.querySelector<HTMLInputElement>("#tempo")!,
  toggle: document.querySelector<HTMLButtonElement>("#toggle")!,
};

setupLocalStorage(ui);
setupUserExperience(ui);
setupAudio(ui);
