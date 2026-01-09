import { Box, Typography } from "@mui/material";
import { useState } from "react";
import PianoRollGrid from "./PianoRollGrid";
import ChordTimeline from "./ChordTimeline";

const MEASURES = 4;
const BEATS_PER_MEASURE = 4;

export default function Track() {
  const [chordEvents, setChordEvents] = useState([]);

  const handleAddChord = (event) => {
    setChordEvents((prev) => [
      ...prev,
      { ...event, id: crypto.randomUUID() },
    ]);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Track
      </Typography>

      <PianoRollGrid
        chordEvents={chordEvents}
        measures={MEASURES}
        beatsPerMeasure={BEATS_PER_MEASURE}
      />

      <ChordTimeline
        chordEvents={chordEvents}
        measures={MEASURES}
        beatsPerMeasure={BEATS_PER_MEASURE}
        onAddChord={handleAddChord}
      />
    </Box>
  );
}
