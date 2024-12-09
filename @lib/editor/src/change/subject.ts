import type { Note } from "../type";

import { Subject } from "rxjs";

export const accidentalDown = new Subject<void>();
export const accidentalNone = new Subject<void>();
export const accidentalUp = new Subject<void>();
export const number0 = new Subject<void>();
export const number1 = new Subject<void>();
export const number2 = new Subject<void>();
export const number3 = new Subject<void>();
export const number4 = new Subject<void>();
export const number5 = new Subject<void>();
export const number6 = new Subject<void>();
export const number7 = new Subject<void>();
export const octaveH = new Subject<void>();
export const octaveL = new Subject<void>();
export const reset = new Subject<Note>();
export const subdivision16n = new Subject<void>();
export const subdivision2n = new Subject<void>();
export const subdivision32n = new Subject<void>();
export const subdivision4n = new Subject<void>();
export const subdivision8n = new Subject<void>();
