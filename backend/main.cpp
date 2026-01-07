//
// Created by weste on 12/31/2025.
//
#include "crow.h"
#include "state/MusicState.h"
#include "domain/Key.h"
#include "domain/Chord.h"
#include "api/key_routes.h"
#include "api/chord_routes.h"
#include <mutex>
#include <memory>

int main() {
    crow::SimpleApp app;
    MusicState state;
    std::mutex mutex;

    state.activeKey = std::make_unique<Key>();
    state.activeChord = std::make_unique<Chord>();

    registerKeyRoutes(app, state, mutex);
    registerChordRoutes(app, state, mutex);

    app.port(18080).multithreaded().run();
}
