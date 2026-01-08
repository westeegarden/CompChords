import React, { useState, useEffect } from 'react';

export default function ChordBuilder() {
    const [root, setRoot] = useState('C');
    const [quality, setQuality] = useState('major');
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
                <label htmlFor="root" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                    Root
                </label>
                <select
                    id="root"
                    value={root}
                    onChange={(e) => setRoot(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                    {roots.map((root) => (
                        <option key={root} value={root}>
                            {root}
                        </option>
                    ))}
                </select>
            </div>

            {/*<div>
                <label htmlFor="keyQuality" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                    Key Quality
                </label>
                <select
                    id="keyQuality"
                    value={keyQuality}
                    onChange={(e) => setKeyQuality(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                    {keyQualities.map((quality) => (
                        <option key={quality} value={quality}>
                            {quality.charAt(0).toUpperCase() + quality.slice(1)}
                        </option>
                    ))}
                </select>
                {error && (
                    <div style={{ marginTop: '12px', color: 'red' }}>
                        {error}
                    </div>
                )}

                {keyInfo && (
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
                )}
            </div>*/}
        </div>
    );
}