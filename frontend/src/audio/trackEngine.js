import * as Tone from "tone";
import { Midi } from "@tonejs/midi";

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

export function downloadMidi(chordEvents) {
  const midi = new Midi();
  const track = midi.addTrack();
  const bpm = Tone.Transport.bpm.value;

  midi.header.setTempo(bpm);

  chordEvents.forEach(ev => {
    const beatsPerMeasure = 4;
    const totalBeats = ev.measure * beatsPerMeasure + ev.beat;
    const timeInSeconds = (totalBeats * 60) / bpm;
    const durationInSeconds = (ev.duration * 60) / bpm;

    // Add each note in chord
    ev.chord.notes.forEach(note => {
      track.addNote({
        name: note + "4",
        time: timeInSeconds,
        duration: durationInSeconds,
      });
    });
  });

  const blob = new Blob([midi.toArray()], { type: "audio/midi" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "chord_progression.mid";
  a.click();
  URL.revokeObjectURL(url);
}