import { useEffect, useState } from "react";

export default function ChordBuilder() {
  const [roots, setRoots] = useState([]);
  const [root, setRoot] = useState("");
  const [mods, setMods] = useState([]);
  const [selectedMod, setSelectedMod] = useState("none");

  const [generalQuality, setGeneralQuality] = useState("");
  const [chordName, setChordName] = useState("");
  const [romanNumeral, setRomanNumeral] = useState("");
  const [notes, setNotes] = useState([]);

  // Load available roots when component mounts
  useEffect(() => {
    fetch("http://localhost:18080/api/chord/options")
      .then(res => res.json())
      .then(data => {
        setRoots(data.roots);
        setRoot(data.defaultRoot);
      })
      .catch(err => console.error("Failed to load chord options:", err));
  }, []);

  // Build chord whenever root or mod changes
  useEffect(() => {
    if (!root) return;

    fetch("http://localhost:18080/api/chord/build", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        root: root,
        mod: selectedMod
      })
    })
      .then(res => res.json())
      .then(data => {
        setGeneralQuality(data.generalQuality);
        setMods(data.mods);
        setSelectedMod(data.selectedMod);
        setChordName(data.name);
        setRomanNumeral(data.romanNumeral);
        setNotes(data.notes);
      })
      .catch(err => console.error("Failed to build chord:", err));
  }, [root, selectedMod]);

  return (
    <div className="chord-builder">
      <h2>Chord Builder</h2>

      <div className="chord-controls">
        {/* Root dropdown */}
        <select value={root} onChange={e => setRoot(e.target.value)}>
          {roots.map(note => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>

        {/* General quality display */}
        <div className="chord-quality">
          {generalQuality}
        </div>

        {/* Mods / extensions dropdown */}
        <select
          value={selectedMod}
          onChange={e => setSelectedMod(e.target.value)}
        >
          {mods.map(mod => (
            <option key={mod} value={mod}>
              {mod}
            </option>
          ))}
        </select>
      </div>

      {/* Chord display */}
      <div className="chord-display">
        <h3>{chordName}</h3>
        <p>{romanNumeral}</p>
        <p>{notes.join(" – ")}</p>
      </div>
    </div>
  );
}
