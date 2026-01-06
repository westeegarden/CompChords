//
// Created by weste on 1/6/2026.
//

#include "KeyService.h"
using namespace std;

void KeyService::setActiveKey(MusicState& state,
                              const string& center,
                              const string& quality) {
    state.activeKey.setKey(center, quality);
}