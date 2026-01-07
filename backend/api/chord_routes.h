//
// Created by weste on 1/6/2026.
//

#ifndef CHORD_ROUTES_H
#define CHORD_ROUTES_H

#pragma once
#include "crow.h"
#include "../state/MusicState.h"
#include <mutex>
using namespace std;

void registerChordRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       mutex& mutex);

#endif //CHORD_ROUTES_H
