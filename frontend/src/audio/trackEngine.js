import * as Tone from "tone";
import { Midi } from "@tonejs/midi";

let sampler;
let part;
let samplerReady = false;

function initSampler() {
    return new Promise((resolve) => {
        console.log('[SAMPLER] initSampler called, samplerReady:', samplerReady);
        if (sampler && samplerReady) {
            resolve();
            return;
        }
        console.log('[SAMPLER] loading samples...');
        sampler = new Tone.Sampler({
            urls: {
                A0:  "A0.mp3",
                C1:  "C1.mp3",
                "D#1": "Ds1.mp3",
                "F#1": "Fs1.mp3",
                A1:  "A1.mp3",
                C2:  "C2.mp3",
                "D#2": "Ds2.mp3",
                "F#2": "Fs2.mp3",
                A2:  "A2.mp3",
                C3:  "C3.mp3",
                "D#3": "Ds3.mp3",
                "F#3": "Fs3.mp3",
                A3:  "A3.mp3",
                C4:  "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                A4:  "A4.mp3",
                C5:  "C5.mp3",
                "D#5": "Ds5.mp3",
                "F#5": "Fs5.mp3",
                A5:  "A5.mp3",
                C6:  "C6.mp3",
                "D#6": "Ds6.mp3",
                "F#6": "Fs6.mp3",
                A6:  "A6.mp3",
                C7:  "C7.mp3",
                "D#7": "Ds7.mp3",
                "F#7": "Fs7.mp3",
                A7:  "A7.mp3",
                C8:  "C8.mp3",
            },
            baseUrl: "https://tonejs.github.io/audio/salamander/",
            onload: () => {
                console.log('[SAMPLER] samples loaded');
                samplerReady = true;
                resolve();
            },
        }).toDestination();
    });
}

export async function createTrack(chordEvents) {
    await initSampler();

    Tone.Transport.stop();
    Tone.Transport.position = "0:0:0";

    if (part) {
        part.dispose();
        part = null;
    }

    const bpm = Tone.Transport.bpm.value;

    const events = chordEvents.map(ev => ({
        time: `${ev.measure}:${ev.beat}:0`,
        notes: ev.chord.notes.map(n => n + "4"),
        duration: ev.duration * (60 / bpm),
    }));

    part = new Tone.Part((time, value) => {
        sampler.triggerAttackRelease(value.notes, value.duration, time);
    }, events);

    part.start(0);
}

export function releaseAll() {
    if (sampler && samplerReady) sampler.releaseAll();
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