import { Box, Typography } from "@mui/material";

export default function ChordTimeline({
  chordEvents,
  measures,
  beatsPerMeasure,
  onAddChord,
}) {
  const totalBeats = measures * beatsPerMeasure;

  const handleDrop = (e) => {
    e.preventDefault();

    const data = e.dataTransfer.getData("application/chord");
    if (!data) return;

    const chord = JSON.parse(data);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const beat = Math.floor((x / rect.width) * totalBeats);
    const snappedMeasure = Math.floor(beat / beatsPerMeasure);

    onAddChord({
      measure: snappedMeasure,
      beat: 0,
      duration: beatsPerMeasure,
      chord,
    });
  };

  return (
    <Box
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      sx={{
        position: "relative",
        height: 80,
        border: "1px solid #444",
        display: "grid",
        gridTemplateColumns: `repeat(${totalBeats}, 1fr)`,
      }}
    >
      {/* Beat grid */}
      {Array.from({ length: totalBeats }).map((_, beat) => (
        <Box
          key={beat}
          sx={{
            borderLeft:
              beat % beatsPerMeasure === 0
                ? "2px solid #555"
                : "1px solid #333",
          }}
        />
      ))}

      {/* Chord blocks */}
      {chordEvents.map((event) => {
        const startBeat =
          event.measure * beatsPerMeasure + event.beat;

        return (
          <Box
            key={event.id}
            sx={{
              position: "absolute",
              left: `${(startBeat / totalBeats) * 100}%`,
              width: `${(event.duration / totalBeats) * 100}%`,
              height: "100%",
              bgcolor: "#1976d2",
              color: "#fff",
              p: 1,
              boxSizing: "border-box",
            }}
          >
            <Typography variant="subtitle2">
              {event.chord.name}
            </Typography>
            <Typography variant="caption">
              {event.chord.rna}
            </Typography>
            <Typography variant="caption" display="block">
              {event.chord.notes.join(", ")}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
