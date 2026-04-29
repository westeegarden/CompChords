import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrow from "@mui/icons-material/PlayArrow";
import FastRewind from "@mui/icons-material/FastRewind";
import Pause from "@mui/icons-material/Pause";
import Download from "@mui/icons-material/Download";
import PianoRollGrid from "./PianoRollGrid";
import ChordTimeline from "./ChordTimeline";
import TrackRuler from "./TrackRuler";
import PianoKeys from "./PianoKeys";
import BpmSelect from "./BpmSelect";
import {play, pause, stop } from "../audio/transport";
import { createTrack, downloadMidi } from "../audio/trackEngine";
import '../styles/Track.css';


export const KEY_WIDTH = 60;
export const ROW_HEIGHT = 30;

export default function Track() {
  const [chordEvents, setChordEvents] = useState([]);
  const [measures, setMeasures] = useState(4);
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyCenter, setKeyCenter] = useState('C');
  const [keyQuality, setKeyQuality] = useState('major');
  const beatsPerMeasure = 4;
  const totalBeats = measures * beatsPerMeasure;

  useEffect(() => {
  setChordEvents([
    {
      id: "test-1",
      measure: 0,
      beat: 0,
      duration: 4,
      chord: {
        name: "Cmaj7",
        rna: "Imaj7",
        notes: ["C", "E", "G", "B"],
      },
    },
    ]);
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isPlaying) {
          handlePause();
        } else {
          handlePlay();
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isPlaying]);

  const handlePlay = () => {
    createTrack(chordEvents)
    play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    pause();
    stop();
    setIsPlaying(false);
  };

  const handleAddChord = (event) => {
    setChordEvents((prev) => [
      ...prev,
      { ...event, id: crypto.randomUUID() },
    ]);
  };

  const moveChord = (updatedEvent) => {
    setChordEvents((prev) =>
      prev.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      )
    );
  }

  const deleteChord = (id) => {
    setChordEvents((prev) => 
      prev.filter((e) => e.id !== id));
  };

  const resizeChord = (id, duration) => {
    setChordEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, duration } : e
      )
    );
  };

  const handleEnded = () => {
    stop();
    setIsPlaying(false);
  }

  return (
    <div className = "track-border-stripe">
      <div className = "track">
        <Box>
          {/* Top control bar */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            mb: 1, }}>

            <div className="track-header">
              TRACK
            </div>
            <Download sx={{ 
              marginLeft: 1, 
              marginRight: 2, 
              scale: 2, 
              color: "#231650",
              ":hover": { color: "#417291", transform: "scale(1.2)" } }} 
              onClick={() => downloadMidi(chordEvents)}/>
            <Box sx={{
              display: "flex", 
              justifyContent: "center",
              border: "3px solid #231650",
              bgcolor: "#444444",
              borderRadius: 2,
            }}>
              {/*<FastRewind sx={{ 
                margin: 1,
                marginLeft: 2,
                scale: 2, 
                color: "#789bac",
                ":hover": { color: "#b0c8d7" }, }} />*/}

              <PlayArrow sx={{ 
                margin: 1, 
                scale: 2, 
                color: "#74b072",
                ":hover": { color: "#c4ffc4" }, }} 
                onClick={handlePlay}/>

              <Pause sx={{ 
                margin: 1, 
                scale: 2, 
                color: "#789bac",
                ":hover": { color: "#b0c8d7" }, }}
                onClick={handlePause} />
            </Box>

            {/* BPM Selector */}
            <BpmSelect/>
          </Box>

          {/* Outer track frame */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `${KEY_WIDTH}px 1fr`,
              border: "3px solid #231650",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "#444444",
            }}
          >
            {/* ================= LEFT COLUMN ================= */}
            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "32px auto auto",
                backgroundColor: "#474747",
              }}
            >
              {/* Empty corner (aligns with ruler) */}
              <Box />

              {/* Piano keys */}
              <PianoKeys />

              {/* Delete bin */}
              <Box
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const data = e.dataTransfer.getData("application/chord-event");
                  if (!data) return;
                  const event = JSON.parse(data);
                  deleteChord(event.id);
                }}
                sx={{
                  height: 60,
                  width: 40,
                  border: "2px dashed #d64f4f",
                  borderRadius: 2,
                  color: "#d64f4f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  justifySelf: "center",
                  cursor: "pointer",
                  mt: 1,
                }}
              >
                <DeleteIcon />
              </Box>
            </Box>

            {/* RIGHT: scrollable */}
            <Box sx={{ overflowX: "auto" }}>
              <Box
                sx={{
                  minWidth: totalBeats * 80,
                  display: "grid",
                  gridTemplateRows: "32px auto auto",
                }}
              >
                <TrackRuler
                  measures={measures}
                  beatsPerMeasure={beatsPerMeasure}
                  onAddMeasures={() => setMeasures(measures + 4)}
                />

                <PianoRollGrid
                  chordEvents={chordEvents}
                  measures={measures}
                  beatsPerMeasure={beatsPerMeasure}
                  isPlaying={isPlaying}
                  bpm={bpm}
                  onEnded={handleEnded}
                />

                <ChordTimeline
                  chordEvents={chordEvents}
                  measures={measures}
                  beatsPerMeasure={beatsPerMeasure}
                  onAddChord={handleAddChord}
                  onMoveChord={moveChord}
                  onResizeChord={resizeChord}
                />
              </Box>
            </Box>
          </Box>

        </Box>
      </div>
    </div>
  );
}
