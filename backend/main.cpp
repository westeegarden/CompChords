//
// Created by weste on 12/31/2025.
//
#include <crow.h>
#include "Key.h"
#include <iostream>
using namespace std;

int main() {
    crow::SimpleApp app;

    cout << "Crow backend starting at http://localhost:18080\n";

    // Example API endpoint with CORS headers
    CROW_ROUTE(app, "/api/info")
    ([](){
        crow::json::wvalue res;
        res["name"] = "Crow Backend Demo";
        res["language"] = "C++";
        res["framework"] = "Crow";

        // Return response with CORS headers
        crow::response r(res);
        r.add_header("Access-Control-Allow-Origin", "*"); // allow React dev server
        return r;
    });

    CROW_ROUTE(app, "/api/chord")
    ([]() {
        crow::json::wvalue res;
        res["root"] = "C";
        res["quality"] = "Maj7";
        res["notes"] = crow::json::wvalue::list({
        "C", "E", "G", "B"
        });
        // Return response with CORS headers
        crow::response r(res);
        r.add_header("Access-Control-Allow-Origin", "*"); // allow React dev server
        return r;
    });

    // Health check endpoint
    CROW_ROUTE(app, "/health")
    ([](){
        crow::response r("OK");
        r.add_header("Access-Control-Allow-Origin", "*");
        return r;
    });

    // API endpoint for key signature info
    CROW_ROUTE(app, "/api/keySig").methods("GET"_method)
    ([](const crow::request& req) {
        try {
            // Read query params
            auto keyCenterStr = req.url_params.get("key");
            auto qualityStr   = req.url_params.get("quality");

            if (!keyCenterStr || !qualityStr) {
                return crow::response(400, "Missing key or quality parameter");
            }

            // Build and set key
            string keyCenter(keyCenterStr);
            string quality(qualityStr);
            Key key;
            key.setKey(keyCenter, quality);

            crow::json::wvalue res;
            res["name"] = key.getName();
            res["notes"] = crow::json::wvalue::list();
            res["sharpsOrFlats"] = crow::json::wvalue::list();
            res["isFlat"] = key.getIsFlatScale();

            auto notes = key.getWorkingKey();
            auto sharpsFlats = key.getSharpsOrFlats();

            for (size_t i = 0; i < notes.size(); ++i) {
                res["notes"][i] = notes[i];
            }

            for (size_t i = 0; i < sharpsFlats.size(); ++i) {
                res["sharpsOrFlats"][i] = sharpsFlats[i];
            }

            crow::response r(res);
            r.add_header("Access-Control-Allow-Origin", "*");
            return r;
        }
        catch (const std::exception& e) {
            CROW_LOG_ERROR << e.what();
            return crow::response(500, e.what());
        }
    });



    app.port(18080).multithreaded().run();
}
