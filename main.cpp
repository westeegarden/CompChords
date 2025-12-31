//
// Created by weste on 12/31/2025.
//
#include <crow.h>

int main()
{
    crow::SimpleApp app;

    // Basic health check endpoint
    CROW_ROUTE(app, "/health")
    ([]{
        return "OK";
    });

    // Simple JSON API endpoint
    CROW_ROUTE(app, "/api/info")
    ([]{
        crow::json::wvalue res;
        res["name"] = "Crow Backend Demo";
        res["language"] = "C++";
        res["framework"] = "Crow";
        return res;
    });

    app.port(18080).multithreaded().run();
}

