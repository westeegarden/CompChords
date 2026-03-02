cmake_minimum_required(VERSION 3.20)
project(crow_backend)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find Crow library installed via vcpkg
find_package(Crow CONFIG REQUIRED)

# Add the executable and only .cpp files
add_executable(crow_backend
        backend/main.cpp
        backend/domain/Key.cpp
        backend/domain/ChordModel.cpp
        backend/domain/Track.cpp
        backend/services/KeyService.cpp
        backend/services/ChordService.cpp
        backend/services/TrackService.cpp
        backend/api/key_routes.cpp
        backend/api/chord_routes.cpp
        backend/api/track_routes.cpp
)

# Make the backend folder visible to include statements
target_include_directories(crow_backend
        PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}/backend
)

# Link Crow library
target_link_libraries(crow_backend PRIVATE Crow::Crow)

target_link_libraries(crow_backend PRIVATE Crow::Crow ws2_32 mswsock)

# Optionally add tests subdirectory
add_subdirectory(backend/tests)