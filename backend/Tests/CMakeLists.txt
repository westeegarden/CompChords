# Add your test executable
add_executable(Tests
        ../domain/Key.h
        ../domain/Key.cpp
        ../domain/Chord.cpp
        ../domain/Chord.h
        test.cpp
        # include backend code you want to test
)
