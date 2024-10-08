import { Notation, n16, n32, n64 } from "./util";

export default Array.of<Notation>().concat([
  n32("5"),
  n32("3"),
  n16("#2"),
  n16("#4"),
  n32("#4"),
  n32("3"),

  n32("#2"),
  n32("3"),
  n16("#4"),
  n16("5"),
  n32("5"),
  n32("#4"),

  n32("3"),
  n32("#2"),
  n32("3"),
  n32("#4"),
  n64("5"),
  n64("#4"),
  n32("3"),
  n32("#4"),
  n32("5"),

  n32("3"),
  n32("#2"),
  n32("3"),
  n32("#4"),
  n64("5"),
  n64("#4"),
  n32("3"),
  n32("#4"),
  n32("5"),
]);
