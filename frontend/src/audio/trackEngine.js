import * as Tone from "tone";

export function createTrack(chordEvents) {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();

    /* Helper function to convert timestamps to seconds */
    const beatsToSeconds = (numBeats, bpm) => {
        const beatsPerSecond = bpm / 60;
        return numBeats / beatsPerSecond;
    }

    /* Loop through chord events and create synth voices */
    chordEvents.forEach((chordEvent) => {
        const bpm = Tone.getTransport().bpm.value;
        const notes = chordEvent.chord.notes;
        const measure = chordEvent.measure;
        const beat = chordEvent.beat;
        const duration = beatsToSeconds(chordEvent.duration, bpm);
        const start = beatsToSeconds((measure * 4 + beat), bpm);

        /* Loop through notes individually */
        notes.forEach((note) => {
            const octave = "4";
            const noteLoc = note + octave;
            synth.triggerAttackRelease(noteLoc, duration, now + start);
        });
    });
}