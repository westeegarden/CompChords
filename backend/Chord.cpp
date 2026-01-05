//
// Created by weste on 1/4/2026.
//

#include "Chord.h"
#include <vector>
#include <string>
#include <algorithm>
#include <iostream>
using namespace std;

/*--------Chord Class--------*/

//Default constructor
Chord::Chord() = default;

/*
 * buildChord: Constructs a chord from a given a root and quality
 * Takes: in value of root
 * Returns: Nothing
*/
void Chord::buildChord(const int root, int rna, Key keySig, bool flatScale) {
    // Setting roman numeral
    vector<string> romanNumerals;
    if (keySig.getQuality() == "Major") {
        romanNumerals = majorRomanNumerals;
    }
    else {
        romanNumerals = minorRomanNumerals;
    }
    romanNumeral = romanNumerals[rna];

    // Setting root note
    rootNote = keySig.getWorkingKey()[root];

    // Setting chord quality

}

/*
 * printChord prints the chord name as well as all the notes in it consists of
*/
void Chord::printChord(ostream &outs, bool flatScale) {
    string output;
    outs << "|" << romanNumeral;
	for (int i = 0; i < 4 - romanNumeral.length(); i++) {
		outs << " ";
	}

    outs << "|[ ";
    for (int i = 0; i < notes.size(); i++) {
        if (flatScale && noteNames[notes[i] - 1][0][1] == '#') {
            output = noteNames[notes[i] - 1][1];
        }
        else {
            output = noteNames[notes[i] - 1][0];
        }
        outs << output << " ";
    }
    outs << "]" << endl;
}

vector<vector<string>> Chord::getNoteNames() {
    return noteNames;
}

vector<int> Chord::getNotes() {
    return notes;
}

string Chord::getRNA() {
    return romanNumeral;
}

int Chord::getLength() {
	return length;
}

void Chord::setRNA(string name) {
    romanNumeral = name;
}

void Chord::setLength(int len) {
	length = len;
}

void Chord::push_back_notes(int val) {
    notes.push_back(val);
}
