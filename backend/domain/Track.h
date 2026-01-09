//
// Created by weste on 1/9/2026.
//

#ifndef TRACK_H
#define TRACK_H

#include <vector>
#include <string>

struct ChordStruct {
    std::string name;
    std::string rna;
    std::vector<std::string> noteNames;
};

struct ChordEvent {
    int measure;
    int beat;
    int duration;
    ChordStruct chord;
};

class Track {
protected:
    int timeSigTop;
    int numMeasures;
    std::vector<ChordEvent> events;

public:
    Track();

    void addChord(const std::string &name,
                  const std::string &rna,
                  const std::vector<std::string> &noteNames,
                  int measure,
                  int beat,
                  int duration);

    std::vector<ChordEvent> getChordEvents();
};

#endif //TRACK_H
