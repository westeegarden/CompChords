import * as Tone from "tone";
import { releaseAll } from "./trackEngine";

export function setBPM(bpm) {
  Tone.Transport.bpm.value = bpm;
}

export async function play() {
  releaseAll();
  await Tone.start();
  Tone.Transport.start();
}

export function pause() {
  releaseAll();
  Tone.Transport.pause();
}

export function stop() {
  Tone.Transport.stop();
  Tone.Transport.position = "0:0:0";
  Tone.Transport.cancel();
}