//
// Created by weste on 1/6/2026.
//

#include "chord_routes.h"
#include "../services/ChordService.h"

void registerChordRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       std::mutex& mutex) {

    CROW_ROUTE(app, "/api/chord/build").methods("POST"_method)
    ([&state](const crow::request& req) {
        std::lock_guard<std::mutex> lock(state.mutex);

        try {
            auto body = crow::json::load(req.body);
            if (!body)
                return crow::response(400, "Invalid JSON");

            string root = body["root"].s();
            string mod  = body["mod"].s();

            ChordService::buildChord(
                state,
                root,
                mod
            );

            auto& chord = *state.activeChord;

            crow::json::wvalue res;
            res["root"] = root;
            res["generalQuality"] = chord.getQuality();
            res["mods"] = crow::json::wvalue::list();
            res["selectedMod"] = mod;
            res["name"] = chord.getChordName();
            res["romanNumeral"] = chord.getRNA();
            res["notes"] = crow::json::wvalue::list();

            auto mods = chord.getAvailableMods();
            for (size_t i = 0; i < mods.size(); ++i)
                res["mods"][i] = mods[i];

            auto notes = chord.getNotes();
            for (size_t i = 0; i < notes.size(); ++i)
                res["notes"][i] = notes[i];

            crow::response r(res);
            r.add_header("Access-Control-Allow-Origin", "*");
            return r;
        }
        catch (const std::exception& e) {
            return crow::response(500, e.what());
        }
    });

}