//
// Created by weste on 1/6/2026.
//

#include "chord_routes.h"
#include <mutex>
#include "../domain/Key.h"
#include "../services/ChordService.h"
#include "../state/MusicState.h"

void registerChordRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       std::mutex& mutex) {

    CROW_ROUTE(app, "/api/chordBuilder").methods("GET"_method)
    ([&state, &mutex](const crow::request& req) {
        std::lock_guard<std::mutex> lock(mutex);

        auto& chord = *state.activeChord;
        auto& key = *state.activeKey;

        auto root = req.url_params.get("root");
        auto mod = req.url_params.get("mod");

        if (!root || !mod)
            return crow::response(400, "Missing params");

        ChordService::buildChord(state, root, mod);

        crow::json::wvalue res;
        res["key"] = key.getName();
        res["root"] = root;
        res["name"] = chord.getName();
        res["quality"] = chord.getQuality();
        res["notes"] = chord.getNotes();
        res["availableRoots"] = key.getWorkingKey();
        res["availableMods"] = chord.getAvailableMods();

        crow::response r(res);
        r.add_header("Access-Control-Allow-Origin", "*");
        return r;
    });
}