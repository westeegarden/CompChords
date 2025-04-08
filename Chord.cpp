#include "Chord.h"
#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

/*--------Chord Class--------*/

//Default constructor
Chord::Chord() = default;

/*
 * buildChord: Constructs a chord from a given a root and quality
 * Takes: in value of root
 * Returns: Nothing
*/
void Chord::buildChord(const int root, int rna, vector<int> keySignature, bool flatScale) {
    vector<int> refChord;
    int rootIndex = 0;

	//Assigning roman numeral
    romanNumeral = romanNumerals[rna];

    //Assigning root to chord name
    for (int i = 0; i < noteNames.size(); i++) {
        if (i + 1 == root && flatScale && noteNames[i].size() == 3) {
            currentChordName = noteNames[i][1];
        }
        else if (i + 1 == root) {
            currentChordName = noteNames[i][0];
        }
    }

    //Returning notes to unmodded values for processing and recentering at root
    for (int i = 0; i < keySignature.size(); i++) {
        if (keySignature[i] < root) {
            keySignature[i] += 12;
        }
    }
    //Sorting and finding index of chord root
    sort(keySignature.begin(), keySignature.end());
    for (int i = 0; i < keySignature.size(); i++) {
        if (keySignature[i] == root) {
            rootIndex = i;
        }
    }

    //Filling notes vector and reference vector used to find chord quality
    for (int i = 0; i < 4; i++) {
        notes.push_back((keySignature[rootIndex + (2 * i)] - 1) % 12 + 1);
        refChord.push_back(keySignature[rootIndex + (2 * i)] - (root - 1));
    }

    //Find associated chord quality
    for (int i = 0; i < qualities.size(); i++) {
        if (refChord == qualities[i]) {
            currentChordName += chordNames[i];
        }
    }
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
    outs << "|" << currentChordName;
    for (int i = 0; i < 8 - currentChordName.length(); i++) {
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

string Chord::getChordName() {
    return currentChordName;
}

string Chord::getRNA() {
    return romanNumeral;
}

int Chord::getLength() {
	return length;
}

void Chord::setChordName(string name) {
    currentChordName += name;
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


