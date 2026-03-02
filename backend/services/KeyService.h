//
// Created by weste on 1/6/2026.
//

#ifndef KEYSERVICE_H
#define KEYSERVICE_H

#pragma once
#include "../state/MusicState.h"
#include <string>

class KeyService {
public:
    static void setActiveKey(MusicState& state,
                             const std::string& center,
                             const std::string& quality);
};

#endif //KEYSERVICE_H
