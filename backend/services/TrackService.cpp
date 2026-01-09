//
// Created by weste on 1/9/2026.
//

#include "TrackService.h"
#include "../state/MusicState.h"
#include "../domain/Track.h"

void TrackService::addChord(MusicState &state,
                            const std::string &name,
                            const std::string &rna,
                            std::vector<std::string> &noteNames,
                            int measure,
                            int beat,
                            int duration) {
    state.activeTrack->addChord(name, rna, noteNames, measure, beat, duration);
}
