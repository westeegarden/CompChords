import React, { useState, useEffect } from 'react';
import { TextField, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
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


    return (
        <div className="tool-panel-border-stripe">
            <div className="tool-panel">
                {/* content */}
                <div className="tool-panel-content">
                    <h2>Chord Builder</h2>
                    
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

                    {/* Chord Name Display */}
                    <div>
                        <TextField
                            label="Chord"
                            value={name}
                            variant="outlined"
                            fullWidth
                        />
                        {error && (
                            <div style={{ marginTop: '12px', color: 'red' }}>
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Notes Display */}
                    {chordInfo && (
                        <div style={{ marginTop: '16px', fontSize: '14px' }}>
                            <strong>Notes:</strong> {notes.join(', ')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}