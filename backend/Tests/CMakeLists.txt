# Add your test executable
add_executable(Tests
        ../domain/Key.h
        ../domain/Key.cpp
        ../domain/ChordModel.cpp
        ../domain/ChordModel.h
        ../domain/Track.h
        ../domain/Track.cpp
        test.cpp
        # include backend code you want to test
)
