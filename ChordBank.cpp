#include "ChordBank.h"
#include <vector>
#include <iostream>
using namespace std;

/*
 * Default Constructor
 * Requires: Nothing
 * Initializes: nothing
 */
ChordBank::ChordBank() {
    isFlatKey = false;
}

/*
 * Constructor
 * Requires: Reference to key signature
 * Initializes: chordList
 */
ChordBank::ChordBank(Key currentKey) {
    reset(currentKey);
}

/*
 * Returns chord list
 * Requires: nothing
 * Modifies: nothing
 */
vector<Chord> ChordBank::getChords() {
    return chordList;
}

/*
 * reset() resets chord bank with new key
 * Requires: Reference to key signature
 * Modifies: chordList
 */
void ChordBank::reset(Key currentKey) {
    const vector<int> notes = currentKey.getWorkingKey();
    isFlatKey = currentKey.getIsFlatScale();
    chordList.clear();
    for (int i = 0; i < 7; i ++) {
        //Declaring Triad and 7 chord
        Triad triad;
        Chord chord;
        triad.buildChord(notes[i], i, notes, isFlatKey);
        chord.buildChord(notes[i], i, notes, isFlatKey);
        chordList.emplace_back(triad);
        chordList.emplace_back(chord);
    }
}

void ChordBank::printChordBank(ostream &outs) {
    outs << "____________________________" << endl;
    outs << "|RNA |Chords  |Notes       |" << endl;
    outs << "----------------------------" << endl;
    for (int i = 0; i < chordList.size(); i++) {
        chordList[i].printChord(cout, isFlatKey);
    }
}

