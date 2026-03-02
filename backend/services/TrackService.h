//
// Created by weste on 1/9/2026.
//

#ifndef TRACKSERVICE_H
#define TRACKSERVICE_H

#pragma once
#include <vector>
#include <string>
#include "../state/MusicState.h"


class TrackService {
public:
    static void addChord(MusicState& state,
                            const std::string& name,
                            const std::string& rna,
                            std::vector<std::string>& noteNames,
                            int measure,
                            int beat,
                            int duration);
};

#endif //TRACKSERVICE_H
