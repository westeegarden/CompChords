//
// Created by weste on 1/6/2026.
//

#include "ChordService.h"
#include "../state/MusicState.h"
#include "../domain/ChordModel.h"

void ChordService::buildChord(MusicState& state,
                              const std::string& root,
                              const std::string& mod) {
    state.activeChord->buildChord(root, mod, *state.activeKey);
}
