import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PianoRollGrid from "./PianoRollGrid";
import ChordTimeline from "./ChordTimeline";
import TrackRuler from "./TrackRuler";
import PianoKeys from "./PianoKeys";
import '../styles/Track.css';

const MEASURES = 4;
const BEATS_PER_MEASURE = 4;
export const KEY_WIDTH = 60;
export const ROW_HEIGHT = 30;

export default function Track() {
  const [chordEvents, setChordEvents] = useState([]);
  const [measures, setMeasures] = useState(4);
  const beatsPerMeasure = 4;
  const totalBeats = measures * beatsPerMeasure;

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

  const resizeChord = (id, duration) => {
    setChordEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, duration } : e
      )
    );
  };

  return (
    <div className = "track">
      <Box>
        <div className="track-header">
          TRACK
        </div>

        {/* Outer track frame */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `${KEY_WIDTH}px 1fr`,
            border: "3px solid #231650",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "#444444",
          }}
        >
          {/* ================= LEFT COLUMN ================= */}
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "32px auto auto",
              backgroundColor: "#474747",
            }}
          >
            {/* Empty corner (aligns with ruler) */}
            <Box />

            {/* Piano keys */}
            <PianoKeys />

            {/* Delete bin */}
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const data = e.dataTransfer.getData("application/chord-event");
                if (!data) return;
                const event = JSON.parse(data);
                deleteChord(event.id);
              }}
              sx={{
                height: 60,
                width: 40,
                border: "2px dashed #d64f4f",
                borderRadius: 2,
                color: "#d64f4f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justifySelf: "center",
                cursor: "pointer",
                mt: 1,
              }}
            >
              <DeleteIcon />
            </Box>
          </Box>

          {/* RIGHT: scrollable */}
          <Box sx={{ overflowX: "auto" }}>
            <Box
              sx={{
                minWidth: totalBeats * 80,
                display: "grid",
                gridTemplateRows: "32px auto auto",
              }}
            >
              <TrackRuler
                measures={measures}
                beatsPerMeasure={beatsPerMeasure}
                onAddMeasures={() => setMeasures(measures + 4)}
              />

              <PianoRollGrid
                chordEvents={chordEvents}
                measures={measures}
                beatsPerMeasure={beatsPerMeasure}
              />

              <ChordTimeline
                chordEvents={chordEvents}
                measures={measures}
                beatsPerMeasure={beatsPerMeasure}
                onAddChord={handleAddChord}
                onMoveChord={moveChord}
                onResizeChord={resizeChord}
              />
            </Box>
          </Box>
        </Box>

      </Box>
    </div>
  );
}
