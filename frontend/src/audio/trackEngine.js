import * as Tone from "tone";

let synth;
let part;

export function createTrack(chordEvents) {
  // init synth
  if (!synth) synth = new Tone.PolySynth(Tone.AMSynth).toDestination();

  // stop Transport first
  Tone.Transport.stop();
  Tone.Transport.position = "0:0:0";

  // dispose previous Part
  if (part) part.dispose();
  part = null;

  // map chord events
  const events = chordEvents.map(ev => ({
    time: `${ev.measure}:${ev.beat}:0`,
    notes: ev.chord.notes.map(n => n + "4"),
    duration: ev.duration 
  }));

  // Grab bpm for duration calculation
  const bpm = Tone.Transport.bpm.value;

  // create Part
  part = new Tone.Part((time, value) => {
    const dur = value.duration * (60 / bpm);
    synth.triggerAttackRelease(value.notes, dur, time);
  }, events);

  part.start(0); // schedule at beginning
}

export function releaseAll() {
  if (synth) synth.releaseAll();
}