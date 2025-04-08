#include "Key.h"
#include "Chord.h"
#include "Triad.h"
#include "Measure.h"
#include "ChordBank.h"
#include <iostream>

using namespace std;

/*--------Testing Executable--------*/
/* Note for Grader:
 * Some of the central methods in this program
 * require user input to run, so I did not implement
 * any automated testing methods for them. This
 * is the reason there is no test_track() for
 * the Track class.
 */

bool test_key();
bool test_chord();
bool test_measure();
bool test_chord_bank();

const vector<int> a_Major = {1, 3, 5, 6, 8, 10, 12};
const vector<int> a_major_7 = {1, 5, 8, 12};
const vector<int> a_major_triad = {1, 5, 8};

int main() {
    if (test_key()) {
        cout << "All Key tests passed" << endl;
    }
    if (test_chord()) {
        cout << "All Chord tests passed" << endl;
    }
    if (test_measure()) {
        cout << "All Measure tests passed" << endl;
    }
    if (test_chord_bank()) {
        cout << "All Chord Bank tests passed" << endl;
    }
    return 0;
}

bool test_key() {
    bool passed = true;
    Key key;
    key.setKey(1, " Major");
    if (key.getWorkingKey() != a_Major) {
        passed = false;
        cout << "Key::setKey() vector value test failed" << endl;
    }
    return passed;
}


bool test_chord() {
    bool passed = true;

    //Chord::buildChord test case
    Chord chord;
    chord.buildChord(1, 0, a_Major, false);
    if (chord.getNotes() != a_major_7) {
        passed = false;
        cout << "Chord::buildChord() notes vector value test failed" << endl;
    }
    else if (chord.getChordName() != "AMaj7") {
        passed = false;
        cout << "Chord::buildChord() chord name test failed" << endl;
    }
    else if (chord.getRNA() != "I7") {
        passed = false;
        cout << "Chord::buildChord() RNA test failed" << endl;
    }

    //Triad::buildChord test case
    Triad triad;
    triad.buildChord(1, 0, a_Major, false);
    if (triad.getNotes() != a_major_triad) {
        passed = false;
        cout << "Triad::buildChord() notes vector value test failed" << endl;
    }
    else if (triad.getChordName() != "AMaj") {
        passed = false;
        cout << "Triad::buildChord() chord name test failed" << endl;
    }
    else if (triad.getRNA() != "I") {
        passed = false;
        cout << "Triad::buildChord() RNA test failed" << endl;
    }
    return passed;
}

bool test_measure() {
    bool passed = true;
    Measure measure;
    if (measure.getChords().size() != 4) {
        passed = false;
        cout << "Measure default constructor test failed" << endl;
    }
    Measure longMeasure(7);
    if (longMeasure.getChords().size() != 7) {
        passed = false;
        cout << "Measure explicit constructor test failed" << endl;
    }
    Chord aMaj7;
    aMaj7.buildChord(1, 0, a_Major, false);
    measure.addChord(aMaj7, 2);
    if (measure.getChords()[0].getNotes() != a_major_7 &&
        !measure.getChords()[1].getNotes().empty()) {
        passed = false;
        cout << "Measure::addChord() test failed" << endl;
    }
    return passed;
}

bool test_chord_bank() {
    bool passed = true;
    ChordBank chord_bank;
    Key key;
    key.setKey(1, " Major");
    chord_bank.reset(key);
    if (chord_bank.getChords()[0].getNotes() != a_major_triad &&
        chord_bank.getChords()[1].getNotes() != a_major_7) {
        passed = false;
        cout << "ChordBank::reset() test failed" << endl;
    }
    return passed;
}