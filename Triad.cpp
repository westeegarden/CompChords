
#include "Triad.h"
#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

/*--------Triad Class--------*/

//Default constructor
Triad::Triad() = default;

//Builds a chord given a root and a key signature
void Triad::buildChord(int root, int rna, vector<int> keySignature, bool flatScale) {
    vector<int> refChord;
    int rootIndex = 0;

    //Assigning roman numeral
    setRNA(romanNumerals[rna]);

    //Assigning root to chord name
    for (int i = 0; i < getNoteNames().size(); i++) {
        if (i + 1 == root && flatScale && getNoteNames()[i].size() == 3) {
            setChordName(getNoteNames()[i][1]);
        }
        else if (i + 1 == root) {
            setChordName(getNoteNames()[i][0]);
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
    for (int i = 0; i < 3; i++) {
        push_back_notes((keySignature[rootIndex + (2 * i)] - 1) % 12 + 1);
        refChord.push_back(keySignature[rootIndex + (2 * i)] - (root - 1));
    }

    //Find associated chord quality
    for (int i = 0; i < qualities.size(); i++) {
        if (refChord == qualities[i]) {
            setChordName(chordNames[i]);
        }
    }
}

void Triad::printChord(ostream &outs, bool flatScale) {
    string output;
    outs << "|" << getRNA();
    for (int i = 0; i < 4 - getRNA().length(); i++) {
        outs << " ";
    }
    outs << "|" << getChordName();
    for (int i = 0; i < 8 - getChordName().length(); i++) {
        outs << " ";
    }
    outs << "|[ ";
    for (int i = 0; i < getNotes().size(); i++) {
        if (flatScale && getNoteNames()[getNotes()[i] - 1][0][1] == '#') {
            output = getNoteNames()[getNotes()[i] - 1][1];
        }
        else {
            output = getNoteNames()[getNotes()[i] - 1][0];
        }
        outs << output << " ";
    }
    outs << "]" << endl;
}

