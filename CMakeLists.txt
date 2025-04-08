cmake_minimum_required(VERSION 3.28)
project(CompChords LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 14)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")

include(FetchContent)

FetchContent_Declare(
    webview
    GIT_REPOSITORY https://github.com/webview/webview
    GIT_TAG 0.12.0
)


message(STATUS "Fetching webview repository...")
FetchContent_MakeAvailable(webview)
message(STATUS "Finished Fetching webview repository.")


add_executable(CompChords
        main.cpp
        Key.cpp
        Chord.cpp
        Track.cpp
        Measure.cpp
        ChordBank.cpp
        Triad.cpp 
        )

target_link_libraries(CompChords PRIVATE webview::core)

