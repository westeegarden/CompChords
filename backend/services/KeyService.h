//
// Created by weste on 1/6/2026.
//

#ifndef KEYSERVICE_H
#define KEYSERVICE_H

#pragma once
#include "../state/MusicState.h"
#include <string>
using namespace std;

class KeyService {
public:
    static void setActiveKey(MusicState& state,
                             const string& center,
                             const string& quality);
};

#endif //KEYSERVICE_H
