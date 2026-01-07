//
// Created by weste on 1/6/2026.
//

#ifndef MUSICSTATE_H
#define MUSICSTATE_H
#pragma once
#include <mutex>
#include <memory>

// Forward declarations ONLY
class Key;
class Chord;

struct MusicState {
    std::unique_ptr<Key> activeKey;
    std::unique_ptr<Chord> activeChord;
    std::mutex mutex;
};
#endif //MUSICSTATE_H
