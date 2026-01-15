import React, { useState, useEffect } from 'react';
import { TextField, Select, FormControl, InputLabel, MenuItem, Box, Typography, Chip } from '@mui/material';
import '../styles/ToolPanel.css';

export default function ChordBuilder() {
    const [root, setRoot] = useState('C');
    const [quality, setQuality] = useState('Major');
    const [mod, setMod] = useState('none');
    const [name, setName] = useState('Cmaj');
    const [notes, setNotes] = useState([]);
    const [roots, setRoots] = useState([]);
    const [mods, setMods] = useState([]);
    const [chordInfo, setChordInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchChord() {
            try {
                const res = await fetch(
                    `http://localhost:18080/api/chordBuilder?root=${encodeURIComponent(
                        root
                    )}&mod=${mod}`
                );

                if (!res.ok) {
                    throw new Error(await res.text());
                }

                const data = await res.json();
                setChordInfo(data);
                setRoots(data.availableRoots);
                setQuality(data.quality);
                setMods(data.availableMods);
                setName(data.name);
                setNotes(data.notes);
                setError(null);
            } catch (err) {
                setError(err.message);
                setChordInfo(null);
            }
        }

        fetchChord();
    }, [root, mod]);

    const handleDragStart = (e) => {
        if (!chordInfo) return;

        e.dataTransfer.setData(
            "application/chord",
            JSON.stringify(chordPayload)
        );
    };

    const chordPayload = chordInfo
        ? {
              name: chordInfo.name,
              rna: chordInfo.rna,
              notes: chordInfo.notes,
          }
        : null;


    return (
        <div className="tool-panel-border-stripe">
            <div className="tool-panel">
                {/* content */}
                <div className="tool-panel-content">
                    <h2>CHORD BUILDER</h2>
                    
                    <div className="chord-select-row" style={{ marginBottom: '12px' }}>
                        {/* Root Selection */}
                        <FormControl fullWidth>
                            <InputLabel id="root-label">Root</InputLabel>
                            <Select
                                labelId="root-label"
                                id="root"
                                value={root}
                                label="Root"
                                onChange={(e) => setRoot(e.target.value)}
                            >
                                {roots.map((r) => (
                                    <MenuItem key={r} value={r}>
                                        {r}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* General Quality Display */}
                        <TextField
                            label="General Quality"
                            value={quality}
                            variant="outlined"
                            fullWidth
                        />
                        {error && (
                            <div style={{ marginTop: '12px', color: 'red' }}>
                                {error}
                            </div>
                        )}

                        {/* Mod Selection */}
                        <FormControl fullWidth>
                            <InputLabel id="mod-label">Mods/Extensions</InputLabel>
                            <Select
                                labelId="mod-label"
                                id="mod"
                                value={mod}
                                label="Mods/Extensions"
                                onChange={(e) => setMod(e.target.value)}
                            >
                                {mods.map((r) => (
                                    <MenuItem key={r} value={r}>
                                        {r}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* Draggable Chord Display */}
                    <Box
                        key={name}
                        draggable={!!chordPayload}
                        onDragStart={handleDragStart}
                        sx={{
                            position: "relative",
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
                            {name}
                        </Typography>
                        {/* Notes as chips */}
                        <Box sx={{ 
                            display: "flex", 
                            flexWrap: "wrap",
                            justifyContent: "center", 
                            mt: 0.5,
                            gap: 0.3 }}
                        >
                            {notes.map((note) => (
                                <Chip
                                key={note}
                                label={note}
                                size="small"
                                sx={{ bgcolor: "#07355f", color: "#c9ccce", fontWeight: "bold" }}
                                />
                            ))}
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    );
}