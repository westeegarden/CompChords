import React, { useState, useEffect } from 'react';
import { TextField, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

export default function ChordBuilder() {
    const [root, setRoot] = useState('C');
    const [quality, setQuality] = useState('Major');
    const [mod, setMod] = useState('none');
    const [name, setName] = useState('Cmaj');
    const [notes, setNotes] = useState([]);
    const [roots, setRoots] = useState([]);
    const [chordInfo, setChordInfo] = useState(null);
    const [error, setError] = useState(null);

    const keyCenters = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
    const keyQualities = ['major', 'minor'];

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
                setError(null);
            } catch (err) {
                setError(err.message);
                setChordInfo(null);
            }
        }

        fetchChord();
    }, [root, mod]);


    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Chord Builder</h2>
            
            <div style={{ marginBottom: '12px' }}>
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
            </div>

            <div>
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

                {/*{keyInfo && (
                    <div style={{ marginTop: '16px', fontSize: '14px' }}>
                        <strong>{keyInfo.name}</strong>

                        <div>
                            Notes: {keyInfo.notes.join(', ')}
                        </div>

                        {keyInfo.sharpsOrFlats.length > 0 && (
                            <div>
                                {keyInfo.isFlat ? 'Flats' : 'Sharps'}:{' '}
                                {keyInfo.sharpsOrFlats.join(', ')}
                            </div>
                        )}
                    </div>
                )}*/}
            </div>
        </div>
    );
}