//
// Created by weste on 1/4/2026.
//

#ifndef CHORD_H
#define CHORD_H
#include <vector>
#include <string>
using namespace std;

class Key;

class Chord {
protected:
    //Fields
    string name;
    string rootNote;
    string romanNumeral;
    string quality;
    string mod;

    //Contains int values of notes in chord
    vector<string> notes;

    //Template vectors for each major chord modification
    vector<int> maj = {1, 5, 8};
    vector<int> aug = {1, 5, 9};
    vector<int> maj7 = {1, 5, 8, 12};
    vector<int> aug7 = {1, 5, 9, 12};
    vector<int> dom7 = {1, 5, 8, 11};
    vector<int> maj9 = {1, 5, 8, 12, 15};
    vector<int> maj9sharp11 = {1, 5, 8, 12, 15, 19};
    vector<int> dom9 = {1, 5, 8, 11, 15};
    vector<int> dom7sharp9 = {1, 5, 8, 11, 16};
    vector<int> dom7b9 = {1, 5, 8, 11, 14};
    vector<int> dom7sharp11 = {1, 5, 8, 11, 15, 19};
    vector<int> maj6 = {1, 5, 8, 10};

    //Template vectors for each minor chord modification
    vector<int> min = {1, 4, 8};
    vector<int> dim = {1, 4, 7};
    vector<int> min7 = {1, 4, 8, 11};
    vector<int> min7b5 = {1, 4, 7, 11};
    vector<int> dim7 = {1, 4, 6, 10};
    vector<int> min9 = {1, 4, 8, 11, 15};
    vector<int> minb9 = {1, 4, 8, 11, 14};
    vector<int> min11 = {1, 4, 8, 11, 15, 18};
    vector<int> min6 = {1, 4, 8, 10};

    //Vector to contain major chord mods
    vector<vector<int>> qualities = {maj7, min7, dom7, min7b5, dim7};

    //Vector to hold the mods available to the user
    vector<string> availableMods;

    //Vector containing names of major quality mods
    vector<string> majorMods = {"none", "aug", "Maj7", "7", "aug7", "Maj9", "Maj9#11",
                                "9", "7b9", "7#9", "7#11", "6"};

    //Vector containing names of minor quality mods
    vector<string> minorMods = {"none", "dim", "min7", "min7b5", "dim7", "min9", "minb9", "min11", "min6"};

    //Vector containing properties of each note
    vector<vector<string>> noteNames = {{"A"}, {"A#", "Bb"}, {"B"}, {"C"}, {"C#", "Db"},
                                          {"D"}, {"D#", "Eb"}, {"E"}, {"F"}, {"F#", "Gb"},
                                          {"G"}, {"G#", "Ab"}};

    //Vector containing roman numerals for each Major scale degree
    vector<string> majorRomanNumerals = { "I", "II", "III", "IV", "V", "VI", "VII" };

    //Vector containing roman numerals for each minor scale degree
    vector<string> minorRomanNumerals = {"i", "ii", "iii", "iv", "v", "vi", "vii"};

    //Boolean vector containing the quality of each chord in a major scale, with index corresponding to scale degree
    //true=major false=minor
    vector<bool> majorScaleChordQualities = {true, false, false, true, true, false, false};

    //Boolean vector containing the quality of each chord in a minor scale, with index corresponding to scale degree
    //true=major false=minor
    vector<bool> minorScaleChordQualities = {false, false, true, false, false, true, true};

public:
    //Constructor
    Chord();

    //Destructor
    virtual ~Chord() = default;

    //Builds a chord given a root and a key signature
    virtual void buildChord(string rootName, string modName, Key &workingKey);

    //Takes a string describing chord mods and returns associated template int vector
    vector<int> modStringToVector(const string &quality);

    vector<string> getAvailableMods();

    vector<vector<string>> getNoteNames();

    vector<string> getNotes();

    string getQuality();

    string getChordName();

    string getRNA();
};

#endif //CHORD_H
