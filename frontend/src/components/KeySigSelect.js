import React, { useState, useEffect } from 'react';
import { TextField, Select, FormControl, InputLabel, MenuItem, Box, Chip } from '@mui/material';
import '../styles/ToolPanel.css';

export default function KeySigSelect({ keyCenter, keyQuality, onKeyChange }) {
    const [keyInfo, setKeyInfo] = useState(null);
    const [error, setError] = useState(null);

    const keyCenters = ['C', 'C#', 'Db', 'D', 'D#', 'E', 'Eb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
    const keyQualities = ['major', 'minor'];

    useEffect(() => {
        async function fetchKeySig() {
            try {
                const res = await fetch(
                    `http://localhost:18080/api/keySig?key=${encodeURIComponent(
                        keyCenter
                    )}&quality=${keyQuality}`
                );

                if (!res.ok) {
                    throw new Error(await res.text());
                }

                const data = await res.json();
                setKeyInfo(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setKeyInfo(null);
            }
        }

        fetchKeySig();
    }, [keyCenter, keyQuality]);


    return (
        <div className="tool-panel-border-stripe">
            <div className="tool-panel">

                {/* content */}
                <div className="tool-panel-content">
                    <h2>KEY SIGNATURE</h2>

                    {/* Key Center Selection */}
                    <div className="key-select-row">
                        <FormControl sx={{ flex: 1, mr: 1 }}>
                            <InputLabel id="keyCenter-label">Key Center</InputLabel>
                            <Select
                                labelId="keyCenter-label"
                                id="keyCenter"
                                value={keyCenter}
                                label="Key Center"
                                onChange={(e) => onKeyChange(e.target.value, keyQuality)}
                            >
                                {keyCenters.map((r) => (
                                    <MenuItem key={r} value={r}>
                                        {r}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Key Quality Selection */}
                        <FormControl sx={{ flex: 1 }}>
                        <InputLabel id="keyQuality-label">Key Quality</InputLabel>
                        <Select
                            labelId="keyQuality-label"
                            id="keyQuality"
                            value={keyQuality}
                            label="Key Quality"
                            onChange={(e) => onKeyChange(keyCenter, e.target.value)}
                        >
                            {keyQualities.map((r) => (
                                <MenuItem key={r} value={r}>
                                    {r}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </div>

                    {/* Key Info Display */}
                    {keyInfo && (
                    <Box sx={{ mt: 2, fontSize: 14 }}>
                        {/* Notes */}
                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ fontSize: 12, mb: 0.5 }}>Notes</Box>
                            <Box
                                sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                }}
                            >
                                {keyInfo.notes.map((note) => (
                                <Chip
                                    key={note}
                                    label={note}
                                    size="small"
                                    sx={{
                                        color: "#e7f0fa",
                                        backgroundColor: "#231650",
                                        fontWeight: "bold",
                                    }}
                                />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    )}
                </div>
            </div>
        </div>
    );
}