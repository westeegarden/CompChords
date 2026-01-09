//
// Created by weste on 1/9/2026.
//

#ifndef TRACK_ROUTES_H
#define TRACK_ROUTES_H

#pragma once
#include "crow.h"
#include "../state/MusicState.h"
#include <mutex>

void registerTrackRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       mutex& mutex);

#endif //TRACK_ROUTES_H
