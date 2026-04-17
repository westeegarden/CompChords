import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import * as Tone from "tone";
import { getPitchClass } from "../res/pitchClass";
import { ROW_HEIGHT } from "./Track";

const NOTES = [
  "B", "Bb", "A", "Ab", "G",
  "Gb", "F", "E", "Eb", "D", "Db", "C",
];

const BLACK_KEYS = ["Db", "C#", "Eb", "D#", "Gb", "F#", "Ab", "G#", "Bb"];
const isBlackKey = (note) => BLACK_KEYS.includes(note.replace(/\d/, ""));

export default function PianoRollGrid({
  chordEvents,
  measures,
  beatsPerMeasure,
  isPlaying,
  bpm,
  onEnded,
}) {
  const totalBeats = measures * beatsPerMeasure;

  // Map from chordEvent id -> array of pitch class strings in its key
  const [keySigMap, setKeySigMap] = useState({});

  const [cursorPercent, setCursorPercent] = useState(0);
  const rafRef = useRef(null);

  // Fetch key sig notes for each unique key found in chordEvents
  useEffect(() => {
    const uniqueKeys = [...new Set(chordEvents.map((e) => e.chord.key).filter(Boolean))];

    Promise.all(
      uniqueKeys.map(async (keyString) => {
        const tonic = keyString.split(" ")[0];
        const quality = keyString.toLowerCase().includes("minor") ? "minor" : "major";
        const res = await fetch(
          `http://localhost:18080/api/keySig?key=${encodeURIComponent(tonic)}&quality=${quality}`
        );
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        return [keyString, data.notes || []];
      })
    )
      .then((entries) => setKeySigMap(Object.fromEntries(entries)))
      .catch((err) => console.error("keySig fetch failed:", err));
  }, [chordEvents]);

  useEffect(() => {
    const secondsPerBeat = 60 / bpm;
    const totalDuration = totalBeats * secondsPerBeat;
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
      } else {
        onEnded?.();
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

      {/* Grid */}
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
              let isInKey = false;

              if (matchingEvent) {
                const rowPC = getPitchClass(note);
                const rootPC = getPitchClass(matchingEvent.chord.notes[0]);
                isRoot = rowPC === rootPC;

                // Look up this chord's key sig from the map
                const keySigNotes = keySigMap[matchingEvent.chord.key] ?? [];
                isInKey = keySigNotes.includes(note.replace(/\d/, ""));
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
                        : isInKey
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