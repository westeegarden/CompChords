import { Box, Typography, Chip } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { getPitchClass } from "../res/pitchClass";

function getKeyColorFromPitchClass(pc, isMinor) {
  const hue = (pc % 12) * 30; // evenly spaced
  const saturation = 70;
  const lightness = isMinor ? 35 : 55;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default function ChordTimeline({
  chordEvents,
  measures,
  beatsPerMeasure,
  onAddChord,
  onMoveChord,
  onResizeChord,
}) {
  const totalBeats = measures * beatsPerMeasure;
  const timelineRef = useRef(null);
  const [resizing, setResizing] = useState(null);
  const [keySigMap, setKeySigMap] = useState({});

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

  // Score helper
  function getChordScore(event) {
    const keySigNotes = keySigMap[event.chord.key] ?? [];
    if (keySigNotes.length === 0) return null; // still loading

    const outOfKey = event.chord.notes.filter(
      (note) => !keySigNotes.includes(note.replace(/\d/, ""))
    ).length;

    return Math.max(0, 5 - outOfKey);
  }

  const handleDrop = (e) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const beat = Math.floor((x / rect.width) * totalBeats);
    const measure = Math.floor(beat / beatsPerMeasure);
    const beatInMeasure = beat % beatsPerMeasure;

    const chordEventData = e.dataTransfer.getData("application/chord-event");
    if (chordEventData) {
      const event = JSON.parse(chordEventData);

      onMoveChord({
        ...event,
        measure,
        beat: beatInMeasure,
      });

      return;
    }

    const chordData = e.dataTransfer.getData("application/chord");

    // Adding new chord from builder
    if (chordData) {
      const chord = JSON.parse(chordData);

      onAddChord({
        measure,
        beat: beatInMeasure,
        duration: beatsPerMeasure,
        chord: {
          ...chord,
          rna: chord.rna,
        },
      });
    }
  };


  const handleDragStart = (e, event) => {
    e.dataTransfer.setData(
      "application/chord-event",
      JSON.stringify(event)
    );

    e.dataTransfer.effectAllowed = "move";
  };


  const handleResizeStart = (e, event) => {
    e.stopPropagation();
    e.preventDefault();

    setResizing({
      id: event.id,
      startX: e.clientX,
      startDuration: event.duration,
    });
  };

  useEffect(() => {
    if (!resizing) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - resizing.startX;

      const beatsPerPixel =
        totalBeats / timelineRef.current.offsetWidth;

      const deltaBeats = Math.round(deltaX * beatsPerPixel);

      onResizeChord(resizing.id, Math.max(1, resizing.startDuration + deltaBeats));
    };

    const handleMouseUp = () => setResizing(null);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);



  return (
    <Box
    ref={timelineRef}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      sx={{
        position: "relative",
        height: 130,
        border: "none",
        boxSizing: "border-box",
        display: "grid",
        width: '100%',
        gridTemplateColumns: `repeat(${totalBeats}, 1fr)`,
        bgcolor: "#444444",
      }}
    >
      {/* Beat grid */}
      {Array.from({ length: totalBeats }).map((_, beat) => (
        <Box
          key={beat}
          sx={{
            borderLeft:
              beat % beatsPerMeasure === 0
                ? "2px solid #333"
                : "1px solid #333",
          }}
        />
      ))}

      {/* Chord blocks */}
      {chordEvents.map((event) => {
        const startBeat =
          event.measure * beatsPerMeasure + event.beat;

        const keyString = event.chord?.key ?? "C Major";
        const tonic = keyString.split(" ")[0];
        const pitchClass = getPitchClass(tonic);
        const isMinor = keyString.includes("minor");
        const keyColor = getKeyColorFromPitchClass(pitchClass, isMinor);
        return (
          <Box
            key={event.id}
            sx={{
              position: "absolute",
              left: `${(startBeat / totalBeats) * 100}%`,
              width: `${(event.duration / totalBeats) * 100}%`,
              height: "100%",
            }}
          >
            {/* MAIN CHORD BOX */}
            <Box
              draggable={!resizing}
              onDragStart={(e) => handleDragStart(e, event)}
              sx={{
                height: "85%",
                bgcolor: "#68a5e2",
                color: "#0e1114",
                p: 1,
                boxSizing: "border-box",
                border: "2px solid #07355f",
                borderRadius: "8px 8px 0 0",
              }}
            >
              {/* Chord name */}
              <Typography
                sx={{
                  fontFamily: "Fjalla One",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {event.chord.name}
              </Typography>

              {/* Score */}
              {(() => {
                const score = getChordScore(event);
                return score !== null ? (
                  <Typography
                    sx={{
                      fontFamily: "Fjalla One",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: 16,
                      color: score === 5 ? "#173d27"
                          : score >= 3 ? "#000000"
                          : "#e74c3c",
                    }}
                  >
                    ★ {score}/5
                  </Typography>
                ) : null;
              })()}

              {/* Notes */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  mt: 0.5,
                  gap: 0.3,
                }}
              >
                {event.chord.notes.map((note) => (
                  <Chip
                    key={note}
                    label={note}
                    size="small"
                    sx={{
                      bgcolor: "#07355f",
                      color: "#c9ccce",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Box>

              {/* Resize handle */}
              <Box
                onMouseDown={(e) => handleResizeStart(e, event)}
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: 8,
                  height: "85%",
                  cursor: "ew-resize",
                  backgroundColor: "rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.3)",
                  },
                }}
              />
            </Box>

            {/* KEY BAR */}
            <Box
              sx={{
                height: "15%",
                bgcolor: keyColor,
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #07355f",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                fontFamily: "Fjalla One",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {event.chord.key}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
