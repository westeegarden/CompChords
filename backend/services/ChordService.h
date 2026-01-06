//
// Created by weste on 1/6/2026.
//

#ifndef CHORDSERVICE_H
#define CHORDSERVICE_H

#pragma once
#include "../state/MusicState.h"
#include "../domain/Chord.h"
using namespace std;

class ChordService {
public:
    static Chord buildChord(MusicState& state,
                            const string& root,
                            const string& mod);
};

#endif //CHORDSERVICE_H
