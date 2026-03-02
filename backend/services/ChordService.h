//
// Created by weste on 1/6/2026.
//

#ifndef CHORDSERVICE_H
#define CHORDSERVICE_H

#pragma once
#include "../state/MusicState.h"
#include "../domain/ChordModel.h"

class ChordService {
public:
    static void buildChord(MusicState& state,
                            const std::string& root,
                            const std::string& mod);
};

#endif //CHORDSERVICE_H
