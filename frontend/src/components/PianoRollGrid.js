import { Box } from "@mui/material";

const NOTES = [
  "B3", "Bb3", "A3", "Ab3", "G3",
  "Gb3", "F3", "E3", "Eb3", "D3", "Db3", "C3",
];

export default function PianoRollGrid({
  chordEvents,
  measures,
  beatsPerMeasure,
}) {
  const totalBeats = measures * beatsPerMeasure;
  const BLACK_KEYS = ["Db", "Eb", "Gb", "Ab", "Bb"];

  const isBlackKey = (note) =>
    BLACK_KEYS.includes(note.replace(/\d/, ""));

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `60px repeat(${totalBeats}, 1fr)`,
        border: "none",
        mb: 0,
      }}
    >
      {NOTES.map((note) => (
        <div key={note} style={{ display: "contents" }}>
          {/* Keys */}
          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
              borderBottom: "1px solid #333",
              fontSize: 12,
              backgroundColor: "#fff9ec",
              textAlign: "right",
            }}
          >
            {/* Left half */}
            <Box
              sx={{
                width: "50%",
                backgroundColor: isBlackKey(note) ? "#222" : "transparent",
              }}
            />

            {/* Right half (label area) */}
            <Box
              sx={{
                width: "50%",
                p: 0.5,
                color: "#000",
              }}
            >
              {note}
            </Box>
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
                      ? "2px solid #333"
                      : "1px solid #333",
                  backgroundColor: active ? "#4caf50" : "#6e6e6e",
                }}
              />
            );
          })}
        </div>
      ))}
    </Box>
  );
}
