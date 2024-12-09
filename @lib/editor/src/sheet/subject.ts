import type { Note } from "../type";

import { Subject } from "rxjs";

export const reset = new Subject<Note[]>();
