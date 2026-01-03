//
// Created by weste on 12/31/2025.
//
#include <crow.h>
#include "Key.h"
#include <iostream>

int main() {
    crow::SimpleApp app;

    std::cout << "Crow backend starting at http://localhost:18080\n";

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
    ([]() {
        try {
            Key testKey;
            testKey.setKey(2, "minor", true);

            crow::json::wvalue res;
            res["name"] = testKey.getName();
            res["notes"] = crow::json::wvalue::list();

            auto notes = testKey.getWorkingKey();
            for (size_t i = 0; i < notes.size(); ++i) {
                res["notes"][i] = notes[i];
            }

            crow::response r(res);
            r.add_header("Access-Control-Allow-Origin", "*");
            return r;
        }
        catch (const std::exception& e) {
            CROW_LOG_ERROR << e.what();
            return crow::response(500, e.what());
        }
        catch (...) {
            CROW_LOG_ERROR << "Unknown exception";
            return crow::response(500, "Internal Server Error");
        }
    });


    app.port(18080).multithreaded().run();
}
