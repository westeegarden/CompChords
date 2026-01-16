import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TrackRuler({
  measures,
  beatsPerMeasure,
  onAddMeasures,
}) {
  const totalBeats = measures * beatsPerMeasure;

  return (
    <Box sx={{ position: "relative", overflowX: "auto" }}>
      {/* Scrollable ruler */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalBeats}, 1fr)`,
          flex: 1,
          overflowX: "auto",
          borderBottom: "2px solid #000",
        }}
      >
        {Array.from({ length: totalBeats }).map((_, beat) => (
          <Box
            key={beat}
            sx={{
              height: 30,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#444444",
              borderLeft:
                beat % beatsPerMeasure === 0
                  ? "2px solid #000"
                  : "1px solid #000",
              color:
                beat % beatsPerMeasure === 0 
                    ? "#FED172" 
                    : "#fff",
            }}
          >
            {beat % beatsPerMeasure === 0
              ? beat / beatsPerMeasure + 1
              : (beat % beatsPerMeasure) + 1}
          </Box>
        ))}
    </Box>

    {/* Add measures button */}
    <IconButton
        onClick={onAddMeasures}
        sx={{
            position: "absolute",
            right: 0,
            top: 0,
            height: 30,
            width: 30,
            backgroundColor: "rgb(84,84,84)",
            border: "2px solid #000",
        }}
    >
        <AddIcon sx={{ color: "#bababa" }} />
    </IconButton>
    </Box>
  );
}

