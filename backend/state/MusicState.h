//
// Created by weste on 1/6/2026.
//

#ifndef MUSICSTATE_H
#define MUSICSTATE_H
#pragma once
#include "../domain/Chord.h"
#include <mutex>
#include <memory>

// Forward declarations ONLY
class Key;
class Chord;
class Track;

struct MusicState {
    std::unique_ptr<Key> activeKey;
    std::unique_ptr<Chord> activeChord;
    std::unique_ptr<Track> activeTrack;
    std::mutex mutex;
};
#endif //MUSICSTATE_H
