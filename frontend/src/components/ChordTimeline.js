import { Box, Typography } from "@mui/material";

export default function ChordTimeline({
  chordEvents,
  measures,
  beatsPerMeasure,
  onAddChord,
  onMoveChord,
}) {
  const totalBeats = measures * beatsPerMeasure;

  const handleDrop = (e) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const beat = Math.floor((x / rect.width) * totalBeats);
    const snappedMeasure = Math.floor(beat / beatsPerMeasure);

    const chordEventData = e.dataTransfer.getData("application/chord-event");
    if (chordEventData) {
      const event = JSON.parse(chordEventData);

      onMoveChord({
        ...event,
        measure: snappedMeasure,
        beat: 0,
      });

      return;
    }

    const chordData = e.dataTransfer.getData("application/chord");

    // Adding new chord from builder
    if (chordData) {
      const chord = JSON.parse(chordData);

      onAddChord({
        measure: snappedMeasure,
        beat: 0,
        duration: beatsPerMeasure,
        chord,
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



  return (
    <Box
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      sx={{
        position: "relative",
        height: 80,
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

        return (
          <Box
            key={event.id}
            draggable
            onDragStart={(e) => handleDragStart(e, event)}
            sx={{
              position: "absolute",
              left: `${(startBeat / totalBeats) * 100}%`,
              width: `${(event.duration / totalBeats) * 100}%`,
              height: "100%",
              bgcolor: "#1976d2",
              color: "#fff",
              p: 1,
              boxSizing: "border-box",
              border: "2px solid #07355f",
              borderRadius: 2,
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
