//
// Created by weste on 1/6/2026.
//

#ifndef KEY_ROUTES_H
#define KEY_ROUTES_H

#pragma once
#include "crow.h"
#include "../state/MusicState.h"
#include <mutex>
using namespace std;

void registerKeyRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       mutex& mutex);

#endif //KEY_ROUTES_H
