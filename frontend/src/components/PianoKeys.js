import { Box } from "@mui/material";
import { ROW_HEIGHT, KEY_WIDTH } from "./Track";

const NOTES = [
  "B", "Bb", "A", "Ab", "G",
  "Gb", "F", "E", "Eb", "D", "Db", "C",
];

const BLACK_KEYS = ["Db", "C#", "Eb", "D#", "Gb", "F#", "Ab", "G#", "Bb"];

const isBlackKey = (note) =>
  BLACK_KEYS.includes(note.replace(/\d/, ""));

export default function PianoKeys() {
  return (
    <Box>
      {NOTES.map((note) => (
        <Box
          key={note}
          sx={{
            height: ROW_HEIGHT,
            display: "flex",
            borderBottom: "1px solid #333",
            backgroundColor: "#fff9ec",
          }}
        >
          {/* Left half (black key indicator) */}
          <Box
            sx={{
              width: "50%",
              backgroundColor: isBlackKey(note) ? "#222" : "transparent",
            }}
          />

          {/* Right half (label) */}
          <Box
            sx={{
              width: "50%",
              p: 0.5,
              textAlign: "right",
              fontSize: 12,
            }}
          >
            {note}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

