//
// Created by weste on 1/9/2026.
//

#ifndef TRACK_ROUTES_H
#define TRACK_ROUTES_H

#pragma once
#include "../state/MusicState.h"
#include "crow.h"
#include <mutex>

void registerTrackRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       std::mutex& mutex);

#endif //TRACK_ROUTES_H
