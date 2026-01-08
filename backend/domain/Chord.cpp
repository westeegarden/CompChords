//
// Created by weste on 1/4/2026.
//

#include "Chord.h"
#include "Key.h"
#include <vector>
#include <string>
#include <unordered_map>
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
void Chord::buildChord(string rootName, string modName, Key &workingKey) {

    // Clearing variables
    notes.clear();
    availableMods.clear();
    romanNumeral.clear();
    quality.clear();
    name.clear();
    rootNote.clear();

    vector<string> workingKeyNotes = workingKey.getWorkingKey();

    // Establish root note as an int
    // rootIndex is to be used with noteNames vector only, not scale degree or RNA
    rootNote = rootName;
    int rootIndex = 0;
    for (int i = 0; i < noteNames.size(); i++) {
        if (workingKey.getIsFlatScale() && noteNames[i].size() > 1 && noteNames[i][1] == rootName) {
            rootIndex = i;
            break;
        }
        if (noteNames[i].size() > 1 && noteNames[i][1] == rootName) {
            rootIndex = i;
            break;
        }
        if (noteNames[i][0] == rootName) {
            rootIndex = i;
            break;
        }
    }

    // Establish root's scale degree for rna and quality type assignment
    // rnaIndex is to be used for scale degree and RNA only
    int rnaIndex = 0;
    for (int i = 0; i < workingKeyNotes.size(); i++) {
        if (workingKeyNotes[i] == rootName) {
            rnaIndex = i;
            break;
        }
    }

    // Check for triad quality and set RNA
    bool isMajorChord = true;
    if (workingKey.getQuality() == "minor") {
        isMajorChord = minorScaleChordQualities[rnaIndex];
    } else {
        isMajorChord = majorScaleChordQualities[rnaIndex];
    }
    if (isMajorChord) {
        quality = "major";
        romanNumeral = majorRomanNumerals[rnaIndex];
        availableMods = majorMods;
    } else {
        quality = "minor";
        romanNumeral = minorRomanNumerals[rnaIndex];
        availableMods = minorMods;
    }
    // Setting chord name
    name = rootNote + modName;

    //Fill notes vector
    vector<int> chordTemplate = modStringToVector(modName);
    for (int i : chordTemplate) {
        vector<string> currentNote = noteNames[(rootIndex + i - 1) % 12];
        if (workingKey.getIsFlatScale() && currentNote.size() > 1) {
            notes.push_back(currentNote[1]);
        } else {
            notes.push_back(currentNote[0]);
        }
    }
}

/*
 * qualityStringToVector takes a string of a given chord mod and returns the associated
 * template int vector to be used in determining the notes in a chord.
 * @param: string quality describing mods
 * @returns: vector<int> template for note numbers
 */
vector<int> Chord::modStringToVector(const string &mod) {
    if (mod == "none") {
        return (quality == "major") ? maj : min;
    }
    if (mod == "aug")  return aug;
    if (mod == "Maj7") return maj7;
    if (mod == "7")    return dom7;
    if (mod == "aug7") return aug7;
    if (mod == "Maj9") return maj9;
    if (mod == "Maj9#11") return maj9sharp11;
    if (mod == "9")    return dom9;
    if (mod == "7b9") return dom7b9;
    if (mod == "7#9") return dom7sharp9;
    if (mod == "7#11") return dom7sharp11;
    if (mod == "6") return maj6;
    if (mod == "dim") return dim;
    if (mod == "min7") return min7;
    if (mod == "min7b5") return min7b5;
    if (mod == "dim7") return dim7;
    if (mod == "min9") return min9;
    if (mod == "minb9") return minb9;
    if (mod == "min11") return min11;
    if (mod == "min6") return min6;

    return {};
}

vector<string> Chord::getAvailableMods() {
    return availableMods;
}

vector<vector<string>> Chord::getNoteNames() {
    return noteNames;
}

vector<string> Chord::getNotes() {
    return notes;
}

string Chord::getQuality() {
    return quality;
}

string Chord::getName() {
    return name;
}

string Chord::getRNA() {
    return romanNumeral;
}

