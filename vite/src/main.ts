import "./style.css";
import { setupLocalStorage } from "./local_storage";
import { setupSound } from "./sound";
import { initalDom, setupUserExperience } from "./user_experience";

document.querySelector<HTMLDivElement>("#app")!.innerHTML =
  document.getElementById("tpl")!.innerHTML;

const ui = initalDom();

setupLocalStorage(ui);
setupUserExperience(ui);
setupSound(ui);

ui.toggle.addEventListener("click", () => {
  navigator.wakeLock.request("screen").catch((e) => {
    alert(e.message);
  });
});

ui.version.textContent = import.meta.env.VITE_VERSION;
