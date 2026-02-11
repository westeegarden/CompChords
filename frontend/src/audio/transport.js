import * as Tone from "tone";

export function setBPM(bpm) {
  Tone.Transport.bpm.value = bpm;
}

export async function play() {
  await Tone.start();
  Tone.Transport.start();
}

export function pause() {
  Tone.Transport.pause();
}

export function stop() {
  Tone.Transport.stop();
  Tone.Transport.position = "0:0:0";
  Tone.Transport.cancel();
}