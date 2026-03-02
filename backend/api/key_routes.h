//
// Created by weste on 1/6/2026.
//

#ifndef KEY_ROUTES_H
#define KEY_ROUTES_H

#pragma once
#include "../state/MusicState.h"
#include "crow.h"
#include <mutex>

void registerKeyRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       std::mutex& mutex);

#endif //KEY_ROUTES_H
