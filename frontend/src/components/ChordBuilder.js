import React, { useState, useEffect, useRef } from 'react';
import { TextField, Select, FormControl, InputLabel, MenuItem, Box, Typography, Chip } from '@mui/material';
import '../styles/ToolPanel.css';

export default function ChordBuilder({ keyCenter, keyQuality }) {
    const [root, setRoot] = useState('C');
    const [quality, setQuality] = useState('Major');
    const [mod, setMod] = useState('none');
    const [name, setName] = useState('Cmaj');
    const [keySig, setKeySig] = useState(null);
    const [notes, setNotes] = useState([]);
    const [roots, setRoots] = useState([]);
    const [mods, setMods] = useState([]);
    const [chordInfo, setChordInfo] = useState(null);
    const [error, setError] = useState(null);

    const keyCenterRef = useRef(keyCenter);
    const keyQualityRef = useRef(keyQuality);

    // Keep refs in sync with props synchronously
    useEffect(() => {
        keyCenterRef.current = keyCenter;
        keyQualityRef.current = keyQuality;
        setRoot(keyCenter);
        setMod('none');
    }, [keyCenter, keyQuality]);

    // Fetch whenever root or mod changes — reads key from refs, never stale
    useEffect(() => {
        const controller = new AbortController();

        async function fetchChord() {
            const currentKey = keyCenterRef.current;
            const currentQuality = keyQualityRef.current;
            try {
                const res = await fetch(
                    `http://localhost:18080/api/chordBuilder?root=${encodeURIComponent(root)}&mod=${encodeURIComponent(mod)}&key=${encodeURIComponent(currentKey)}&quality=${currentQuality}`,
                    { signal: controller.signal }
                );
                if (!res.ok) throw new Error(await res.text());
                const data = await res.json();
                console.log('[FETCH RESPONSE] availableRoots:', data.availableRoots, 'key:', data.key);
                setChordInfo(data);
                setRoots(data.availableRoots);
                setQuality(data.quality);
                setMods(data.availableMods);
                setName(data.name);
                setNotes(data.notes);
                setKeySig(data.key);
                setError(null);
            } catch (err) {
                if (err.name === 'AbortError') return; // discard stale response, do nothing
                setError(err.message);
                setChordInfo(null);
            }
        }

        fetchChord();
        return () => controller.abort();
    }, [root, mod]);

    const handleDragStart = (e) => {
        if (!chordInfo) return;
        e.dataTransfer.setData("application/chord", JSON.stringify({
            name: chordInfo.name,
            rna: chordInfo.rna,
            notes: chordInfo.notes,
            root: chordInfo.root,
            key: chordInfo.key,
        }));
    };

    const chordPayload = chordInfo
        ? {
              name: chordInfo.name,
              rna: chordInfo.rna,
              notes: chordInfo.notes,
              root: chordInfo.root,
              key: chordInfo.key,
          }
        : null;

    return (
        <div className="tool-panel-border-stripe">
            <div className="tool-panel">
                <div className="tool-panel-content">
                    <h2>CHORD BUILDER</h2>
                    
                    <div className="chord-select-row" style={{ marginBottom: '12px' }}>
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

                        <TextField
                            label="General Character"
                            value={quality}
                            variant="outlined"
                            fullWidth
                        />
                        {error && (
                            <div style={{ marginTop: '12px', color: 'red' }}>
                                {error}
                            </div>
                        )}

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

                    <Box
                        key={name}
                        draggable={!!chordPayload}
                        onDragStart={handleDragStart}
                        sx={{
                            position: "relative",
                            bgcolor: "#7ea8d1",
                            color: "#000000",
                            p: 1,
                            boxSizing: "border-box",
                            border: "2px solid #083157",
                            borderRadius: 2,
                        }}
                    >
                        <Typography sx={{ 
                            fontFamily: 'Fjalla One', 
                            fontWeight: 'bold',
                            textAlign: 'center',}}
                        >
                            {name}
                        </Typography>
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