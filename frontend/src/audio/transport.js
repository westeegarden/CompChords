import * as Tone from "tone";

export function setBPM(bpm) {
  Tone.getTransport().bpm.value = bpm;
}

export function play() {
  Tone.getTransport().start();
}

export function stop() {
  Tone.getTransport().stop();
}