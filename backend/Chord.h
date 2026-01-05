//
// Created by weste on 1/4/2026.
//

#ifndef CHORD_H
#define CHORD_H
#include <vector>
#include <string>
#include "Key.h"
using namespace std;

class Chord {
protected:
    //Fields
    string rootNote;
    string romanNumeral;
    string quality;
    string extension;
    string mods;
    int length = 0;

    //Contains int values of notes in chord
    vector<int> notes;

    //Template vectors for each chord quality
    vector<int> maj7 = {1, 5, 8, 12};
    vector<int> min7 = {1, 4, 8, 11};
    vector<int> seven = {1, 5, 8, 11};
    vector<int> min7b5 = {1, 4, 7, 11};
    vector<int> dim7 = {1, 4, 6, 10};
    vector<vector<int>> qualities = {maj7, min7, seven, min7b5, dim7};

    //Vector containing names of chord qualities
    vector<string> qualityNames = {"Maj", "min", "dim", "aug"};

    //Vector containing names of chord extensions
    vector<string> modsNames = {"7", "9", "b9", "#9", "#11", "7b5"};

    //Vector containing properties of each note
    vector<vector<string>> noteNames = {{"A"}, {"A#", "Bb"}, {"B"}, {"C"}, {"C#", "Db"},
                                          {"D"}, {"D#", "Eb"}, {"E"}, {"F"}, {"F#", "Gb"},
                                          {"G"}, {"G#", "Ab"}};

    //Vector containing roman numerals for each Major scale degree
    vector<string> majorRomanNumerals = { "I", "II", "III", "IV", "V", "VI", "VII" };

    //Vector containing roman numerals for each minor scale degree
    vector<string> minorRomanNumerals = {"i", "ii", "iii", "iv", "v", "vi", "vii"};

public:
    //Constructor
    Chord();

    //Destructor
    virtual ~Chord() = default;

    //Builds a chord given a root and a key signature
    virtual void buildChord(int root, int rna, Key keySig, bool flatScale);

    //Method for printing chords
    virtual void printChord(ostream &outs, bool flatScale);

    vector<vector<string>> getNoteNames();

    vector<int> getNotes();

    string getChordName();

    string getRNA();

    int getLength();

    void setChordName(string name);

    void setRNA(string name);

    void setLength(int len);

    void push_back_notes(int val);
};

#endif //CHORD_H
