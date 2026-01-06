//
// Created by weste on 12/31/2025.
//
#include "crow.h"
#include "state/MusicState.h"
#include "api/key_routes.h"
#include "api/chord_routes.h"
#include <mutex>

int main() {
    crow::SimpleApp app;

    MusicState state;
    std::mutex mutex;

    registerKeyRoutes(app, state, mutex);
    //registerChordRoutes(app, state, mutex);

    app.port(18080).multithreaded().run();
}
