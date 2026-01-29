import { Box, TextField } from "@mui/material";
import { useState } from "react";

export default function BpmSelect() {
  const [BPM, setBPM] = useState(120);

  const handleBPMChange = (tempo) => {
    setBPM(tempo);
  };

  return (
    <Box>
      <TextField sx={{
        marginLeft: 2,
        maxWidth: 70
      }}
        label="BPM"
        type="number"
        value={BPM}
        onChange={(e) => handleBPMChange(Number(e.target.value))}
      />
    </Box>
  );
}