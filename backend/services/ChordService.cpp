//
// Created by weste on 1/6/2026.
//

#include "ChordService.h"

Chord ChordService::buildChord(MusicState& state,
                               const std::string& root,
                               const std::string& mod) {
    Chord c;
    c.buildChord(root, mod, state.activeKey);
    return c;
}