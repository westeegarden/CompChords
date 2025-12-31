//
// Created by weste on 12/31/2025.
//
#include <crow.h>
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

    // Health check endpoint
    CROW_ROUTE(app, "/health")
    ([](){
        crow::response r("OK");
        r.add_header("Access-Control-Allow-Origin", "*");
        return r;
    });

    app.port(18080).multithreaded().run();
}
