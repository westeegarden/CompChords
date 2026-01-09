//
// Created by weste on 1/9/2026.
//

#include "track_routes.h"
#include <mutex>
#include "../domain/Track.h"
#include "../services/TrackService.h"
#include "../state/MusicState.h"
using namespace std;

void registerTrackRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       mutex& mutex) {
    CROW_ROUTE(app, "/api/track").methods("GET"_method)
    ([&state, &mutex](const crow::request& req) {
        std::lock_guard<std::mutex> lock(mutex);

        auto& chord = state.activeChord;
        auto& track = state.activeTrack;

        auto name = req.url_params.get("name");
        auto rna = req.url_params.get("rna");
        if (!name || !rna) {
            return crow::response(400, "Missing name or RNA");
        }

        auto measureStr = req.url_params.get("measure");
        auto beatStr   = req.url_params.get("beat");
        auto durationStr = req.url_params.get("duration");
        if (!measureStr || !beatStr || !durationStr) {
            return crow::response(400, "Missing measure, beat, or duration");
        }
        int measure = stoi(measureStr);
        int beat = stoi(beatStr);
        int duration = stoi(durationStr);

        auto noteNamesStr = req.url_params.get("noteNames");
        if (!noteNamesStr) {
            return crow::response(400, "Missing noteNames");
        }
        vector<string> noteNames;
        stringstream ss(noteNamesStr);
        string note;
        while (getline(ss, note, ',')) {
            noteNames.push_back(note);
        }

        TrackService::addChord(state,
            name,
            rna,
            noteNames,
            measure,
            beat,
            duration);


    });
}