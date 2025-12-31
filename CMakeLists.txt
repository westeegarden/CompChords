cmake_minimum_required(VERSION 3.20)
project(crow_backend)

set(CMAKE_CXX_STANDARD 20)

find_package(Crow CONFIG REQUIRED)

add_executable(crow_backend main.cpp)
target_link_libraries(crow_backend PRIVATE Crow::Crow)
