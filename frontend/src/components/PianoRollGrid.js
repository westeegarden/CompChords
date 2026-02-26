import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import * as Tone from "tone";
import { getPitchClass } from "../res/pitchClass";
import { ROW_HEIGHT } from "./Track";

const NOTES = [
  "B3", "Bb3", "A3", "Ab3", "G3",
  "Gb3", "F3", "E3", "Eb3", "D3", "Db3", "C3",
];

export default function PianoRollGrid({
  chordEvents,
  measures,
  beatsPerMeasure,
  isPlaying,
  bpm
}) {
  const totalBeats = measures * beatsPerMeasure;
  const BLACK_KEYS = ["Db", "C#", "Eb", "D#", "Gb", "F#", "Ab", "G#", "Bb"];
  const isBlackKey = (note) =>
    BLACK_KEYS.includes(note.replace(/\d/, ""));
  const isInKeySignature = (note) =>
    keySigNotes.includes(note.replace(/\d/, ""));

  const [keySigNotes, setKeySigNotes] = useState([]);
  const [keyCenter, setKeyCenter] = useState('C');
  const [keyQuality, setKeyQuality] = useState('major');
  const [error, setError] = useState(null);

  const [cursorPercent, setCursorPercent] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    async function fetchKeySig() {
      try {
        const res = await fetch(
           `http://localhost:18080/api/keySig?key=${encodeURIComponent(
              keyCenter
            )}&quality=${keyQuality}`
        );

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const data = await res.json();
        setKeySigNotes(data.notes || []);
        setKeyCenter(data.keyCenter || 'C');
        setKeyQuality(data.quality || 'major');
        setError(null);
      } catch (err) {
        setError(err.message);
        setKeySigNotes([]);
      }
    }

    fetchKeySig();
  }, []);

  const totalDurationRef = useRef(0);

useEffect(() => {
  const secondsPerBeat = 60 / bpm;
  totalDurationRef.current = totalBeats * secondsPerBeat;
}, [bpm, totalBeats]);

useEffect(() => {
  if (!isPlaying) {
    cancelAnimationFrame(rafRef.current);
    setCursorPercent(0);
    return;
  }

  const tick = () => {
  const currentBeat = Tone.Transport.ticks / Tone.Transport.PPQ;
  const pct = Math.min((currentBeat / totalBeats) * 100, 100);
  setCursorPercent(pct);

  if (pct < 100) {
    rafRef.current = requestAnimationFrame(tick);
  }
};

  rafRef.current = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafRef.current);
}, [isPlaying]); 

  return (
    <Box sx={{ position: "relative", height: NOTES.length * ROW_HEIGHT }}>

      {/* Playback cursor */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${cursorPercent}%`,
          width: "2px",
          backgroundColor: "#efff75",
          opacity: isPlaying ? 1 : 0,
          pointerEvents: "none",
          zIndex: 10,
          transition: "opacity 0.15s ease",
          boxShadow: "0 0 6px 1px rgba(255,255,255,0.4)",
        }}
      />

      {/* Original grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalBeats}, 1fr)`,
          border: "none",
          mb: 0,
        }}
      >
        {NOTES.map((note) => (
          <div key={note} style={{ display: "contents" }}>
            {Array.from({ length: totalBeats }).map((_, beat) => {
              const matchingEvent = chordEvents.find((event) => {
                const start = event.measure * beatsPerMeasure + event.beat;
                const end = start + event.duration;
                const rowPC = getPitchClass(note);
                return (
                  beat >= start &&
                  beat < end &&
                  event.chord.notes.some((n) => getPitchClass(n) === rowPC)
                );
              });

              let isRoot = false;
              if (matchingEvent) {
                const rowPC = getPitchClass(note);
                const rootPC = getPitchClass(matchingEvent.chord.notes[0]);
                isRoot = rowPC === rootPC;
              }

              return (
                <Box
                  key={`${note}-${beat}`}
                  sx={{
                    height: 30,
                    borderBottom: "1px solid #222",
                    borderLeft:
                      beat % beatsPerMeasure === 0
                        ? "2px solid #333"
                        : "1px solid #333",
                    backgroundColor: matchingEvent
                      ? isRoot
                        ? "#B83A14"
                        : isInKeySignature(note)
                        ? "#F3742B"
                        : "#FED172"
                      : isBlackKey(note)
                      ? "#5c5c5c"
                      : "#6e6e6e",
                  }}
                />
              );
            })}
          </div>
        ))}
      </Box>
    </Box>
  );
}