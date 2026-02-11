import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { setBPM as setTransportBPM } from "../audio/transport";

export default function BpmSelect() {
  const [BPM, setBpm] = useState(120);

  const handleBPMChange = (tempo) => {
    setBpm(tempo);
    setTransportBPM(tempo);
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