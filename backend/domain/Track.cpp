//
// Created by weste on 1/9/2026.
//

#include "Track.h"
using namespace std;

Track::Track() {
    timeSigTop = 4;
    numMeasures = 4;
}

void Track::addChord(const std::string &name,
                     const std::string &rna,
                     const std::vector<std::string> &noteNames,
                     int measure,
                     int beat,
                     int duration) {
    // Build chord struct
    ChordStruct newChord;
    newChord.name = name;
    newChord.rna = rna;
    newChord.noteNames = noteNames;

    //Build ChordEvent struct
    ChordEvent newChordEvent;
    newChordEvent.measure = measure;
    newChordEvent.beat = beat;
    newChordEvent.duration = duration;
    newChordEvent.chord = newChord;

    //Add to events vector
    events.push_back(newChordEvent);
}

vector<ChordEvent> Track::getChordEvents() {
    return events;
}

void Track::clearChordEvents() {
    events.clear();
}
