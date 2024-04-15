export function create(ctx: AudioContext) {
  const x = ctx.createOscillator();
  x.type = "square";
  return x;
}
