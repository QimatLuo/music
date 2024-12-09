import { Subject } from "rxjs";

export const decrease = new Subject<void>();
export const increase = new Subject<void>();
export const reset = new Subject<number>();
