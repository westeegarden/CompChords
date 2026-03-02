//
// Created by weste on 1/6/2026.
//

#ifndef CHORD_ROUTES_H
#define CHORD_ROUTES_H

#pragma once
#include "../state/MusicState.h"
#include "crow.h"
#include <mutex>

void registerChordRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       std::mutex& mutex);

#endif //CHORD_ROUTES_H
