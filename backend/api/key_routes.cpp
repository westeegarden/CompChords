//
// Created by weste on 1/6/2026.
//

#include "key_routes.h"
#include "../services/KeyService.h"

void registerKeyRoutes(crow::SimpleApp& app,
                       MusicState& state,
                       std::mutex& mutex) {

    CROW_ROUTE(app, "/api/keySig").methods("GET"_method)
    ([&state, &mutex](const crow::request& req) {
        std::lock_guard<std::mutex> lock(mutex);

        auto tonic = req.url_params.get("key");
        auto quality = req.url_params.get("quality");

        if (!tonic || !quality)
            return crow::response(400, "Missing params");

        Key& key = state.activeKey;

        KeyService::setActiveKey(state, tonic, quality);

        crow::json::wvalue res;
        res["name"] = key.getName();
        res["isFlat"] = key.getIsFlatScale();
        res["notes"] = key.getWorkingKey();
        res["sharpsOrFlats"] = key.getSharpsOrFlats();

        crow::response r(res);
        r.add_header("Access-Control-Allow-Origin", "*");
        return r;
    });
}