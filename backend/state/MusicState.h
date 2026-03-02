//
// Created by weste on 1/6/2026.
//

#ifndef MUSICSTATE_H
#define MUSICSTATE_H
#pragma once

#include "domain/Key.h"
#include "domain/ChordModel.h"
#include "domain/Track.h"
#include <mutex>
#include <memory>

struct MusicState {
    std::unique_ptr<Key> activeKey;
    std::unique_ptr<ChordModel> activeChord;
    std::unique_ptr<Track> activeTrack;
    std::mutex mutex;
};
#endif //MUSICSTATE_H
