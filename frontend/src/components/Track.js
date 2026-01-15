import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PianoRollGrid from "./PianoRollGrid";
import ChordTimeline from "./ChordTimeline";
import '../styles/Track.css';

const MEASURES = 4;
const BEATS_PER_MEASURE = 4;
const KEY_WIDTH = 60;

export default function Track() {
  const [chordEvents, setChordEvents] = useState([]);

  useEffect(() => {
  setChordEvents([
    {
      id: "test-1",
      measure: 0,
      beat: 0,
      duration: 4,
      chord: {
        name: "Cmaj7",
        rna: "Imaj7",
        notes: ["C", "E", "G", "B"],
      },
    },
    ]);
    }, []);

  const handleAddChord = (event) => {
    setChordEvents((prev) => [
      ...prev,
      { ...event, id: crypto.randomUUID() },
    ]);
  };

  const moveChord = (updatedEvent) => {
    setChordEvents((prev) =>
      prev.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      )
    );
  }

  const deleteChord = (id) => {
    setChordEvents((prev) => 
      prev.filter((e) => e.id !== id));
  };

  return (
    <div className = "track">
      <Box>
        <div className="track-header">
          TRACK
        </div>

        {/* Shared layout grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `60px 1fr`,
            gridAutoRows: "min-content",
            border: "3px solid #231650",
            borderRadius: 2,
            overflow: "hidden",
            rowGap: 0,
          }}
        >
          {/* Piano roll spans both columns */}
          <Box sx={{ gridColumn: "1 / -1" }}>
            <PianoRollGrid
              chordEvents={chordEvents}
              measures={MEASURES}
              beatsPerMeasure={BEATS_PER_MEASURE}
            />
          </Box>

          {/* Empty cell under keys */}
          <Box />

          {/* Timeline only under beat grid */}
          <ChordTimeline
            chordEvents={chordEvents}
            measures={MEASURES}
            beatsPerMeasure={BEATS_PER_MEASURE}
            onAddChord={handleAddChord}
            onMoveChord={moveChord}
            onDeleteChord={deleteChord}
          />
        </Box>

        <Box
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const data =
              e.dataTransfer.getData("application/chord-event");

            if (!data) return;

            const event = JSON.parse(data);
            deleteChord(event.id);
          }}
          sx={{
            mt: 2,
            height: 60,
            border: "2px dashed #b71c1c",
            borderRadius: 2,
            color: "#b71c1c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          Drop here to delete
        </Box>

    </Box>
    </div>
  );
}
