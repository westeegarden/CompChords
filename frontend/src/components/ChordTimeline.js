import { Box, Typography, Chip } from "@mui/material";
import { useEffect, useState, useRef } from "react";

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

        return (
          <Box
            key={event.id}
            draggable={!resizing}
            onDragStart={(e) => handleDragStart(e, event)}
            sx={{
              position: "absolute",
              left: `${(startBeat / totalBeats) * 100}%`,
              width: `${(event.duration / totalBeats) * 100}%`,
              height: "100%",
              bgcolor: "#68a5e2",
              color: "#0e1114",
              p: 1,
              boxSizing: "border-box",
              border: "2px solid #07355f",
              borderRadius: 2,
            }}
          >
            <Typography sx ={{ 
              fontFamily: 'Fjalla One', 
              fontWeight: 'bold',
              textAlign: 'center',}}
            >
              {event.chord.name}
            </Typography>
            
            {/* Notes as chips */}
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap",
              justifyContent: "center", 
              mt: 0.5,
              gap: 0.3 }}
            >
              {event.chord.notes.map((note) => (
                <Chip
                  key={note}
                  label={note}
                  size="small"
                  sx={{ bgcolor: "#07355f", color: "#c9ccce", fontWeight: "bold" }}
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
                height: "100%",
                cursor: "ew-resize",
                backgroundColor: "rgba(0,0,0,0.15)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.3)",
                },
              }}
            />
          </Box>);
      })}
    </Box>
  );
}
