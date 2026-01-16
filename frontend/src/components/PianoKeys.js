import { Box } from "@mui/material";
import { ROW_HEIGHT, KEY_WIDTH } from "./Track";

const NOTES = [
  "B3", "Bb3", "A3", "Ab3", "G3",
  "Gb3", "F3", "E3", "Eb3", "D3", "Db3", "C3",
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

