cmake_minimum_required(VERSION 3.20)
project(crow_backend)

set(CMAKE_CXX_STANDARD 20)

find_package(Crow CONFIG REQUIRED)

add_executable(crow_backend backend/main.cpp
        backend/domain/Key.h
        backend/domain/Key.cpp
        backend/domain/Chord.cpp
        backend/domain/Chord.h
        backend/state/MusicState.h
        backend/services/KeyService.cpp
        backend/services/KeyService.h
        backend/services/ChordService.cpp
        backend/services/ChordService.h
        backend/api/key_routes.cpp
        backend/api/key_routes.h
        backend/api/chord_routes.cpp
        backend/api/chord_routes.h
        backend/utils/JsonUtils.h
)
target_link_libraries(crow_backend PRIVATE Crow::Crow)

# Add the tests folder
add_subdirectory(backend/tests)