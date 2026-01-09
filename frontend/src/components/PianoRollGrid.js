import { Box } from "@mui/material";

const NOTES = [
  "C4", "B3", "Bb3", "A3", "Ab3", "G3",
  "Gb3", "F3", "E3", "Eb3", "D3", "Db3", "C3",
];

export default function PianoRollGrid({
  chordEvents,
  measures,
  beatsPerMeasure,
}) {
  const totalBeats = measures * beatsPerMeasure;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `60px repeat(${totalBeats}, 1fr)`,
        border: "1px solid #444",
        mb: 2,
      }}
    >
      {NOTES.map((note) => (
        <div key={note} style={{ display: "contents" }}>
          {/* Note label */}
          <Box
            sx={{
              borderBottom: "1px solid #333",
              fontSize: 12,
              p: 0.5,
            }}
          >
            {note}
          </Box>

          {/* Beat cells */}
          {Array.from({ length: totalBeats }).map((_, beat) => {
            const active = chordEvents.some((event) => {
              const start = event.measure * beatsPerMeasure + event.beat;
              const end = start + event.duration;
              const noteName = note.replace(/\d/, "");

              return (
                beat >= start &&
                beat < end &&
                event.chord.notes.includes(noteName)
              );
            });

            return (
              <Box
                key={`${note}-${beat}`}
                sx={{
                  height: 24,
                  borderBottom: "1px solid #222",
                  borderLeft:
                    beat % beatsPerMeasure === 0
                      ? "2px solid #555"
                      : "1px solid #333",
                  backgroundColor: active ? "#4caf50" : "transparent",
                }}
              />
            );
          })}
        </div>
      ))}
    </Box>
  );
}
