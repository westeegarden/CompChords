//
// Created by weste on 1/4/2026.
//

#ifndef CHORD_H
#define CHORD_H
#include <vector>
#include <string>
#include "Key.h"

class ChordModel {
protected:
    //Fields
    std::string name;
    std::string rootNote;
    std::string romanNumeral;
    std::string quality;
    std::string mod;

    //Contains int values of notes in chord
    std::vector<std::string> notes;

    //Template vectors for each major chord modification
    std::vector<int> maj = {1, 5, 8};
    std::vector<int> aug = {1, 5, 9};
    std::vector<int> maj7 = {1, 5, 8, 12};
    std::vector<int> aug7 = {1, 5, 9, 12};
    std::vector<int> dom7 = {1, 5, 8, 11};
    std::vector<int> maj9 = {1, 5, 8, 12, 15};
    std::vector<int> maj9sharp11 = {1, 5, 8, 12, 15, 19};
    std::vector<int> dom9 = {1, 5, 8, 11, 15};
    std::vector<int> dom7sharp9 = {1, 5, 8, 11, 16};
    std::vector<int> dom7b9 = {1, 5, 8, 11, 14};
    std::vector<int> dom7sharp11 = {1, 5, 8, 11, 15, 19};
    std::vector<int> maj6 = {1, 5, 8, 10};

    //Template vectors for each minor chord modification
    std::vector<int> min = {1, 4, 8};
    std::vector<int> dim = {1, 4, 7};
    std::vector<int> min7 = {1, 4, 8, 11};
    std::vector<int> min7b5 = {1, 4, 7, 11};
    std::vector<int> dim7 = {1, 4, 6, 10};
    std::vector<int> min9 = {1, 4, 8, 11, 15};
    std::vector<int> minb9 = {1, 4, 8, 11, 14};
    std::vector<int> min11 = {1, 4, 8, 11, 15, 18};
    std::vector<int> min6 = {1, 4, 8, 10};

    //Vector to contain major chord mods
    std::vector<std::vector<int>> qualities = {maj7, min7, dom7, min7b5, dim7};

    //Vector to hold the mods available to the user
    std::vector<std::string> availableMods;

    //Vector containing names of major quality mods
    std::vector<std::string> majorMods = {"none", "aug", "Maj7", "7", "aug7", "Maj9", "Maj9#11",
                                "9", "7b9", "7#9", "7#11", "6"};

    //Vector containing names of minor quality mods
    std::vector<std::string> minorMods = {"none", "7", "dim", "min7", "min7b5", "dim7", "min9", "minb9", "min11", "min6"};

    //Vector containing properties of each note
    std::vector<std::vector<std::string>> noteNames = {{"A"}, {"A#", "Bb"}, {"B"}, {"C"}, {"C#", "Db"},
                                          {"D"}, {"D#", "Eb"}, {"E"}, {"F"}, {"F#", "Gb"},
                                          {"G"}, {"G#", "Ab"}};

    //Vector containing roman numerals for each Major scale degree
    std::vector<std::string> majorRomanNumerals = { "I", "II", "III", "IV", "V", "VI", "VII" };

    //Vector containing roman numerals for each minor scale degree
    std::vector<std::string> minorRomanNumerals = {"i", "ii", "iii", "iv", "v", "vi", "vii"};

    //Boolean vector containing the quality of each chord in a major scale, with index corresponding to scale degree
    //true=major false=minor
    std::vector<bool> majorScaleChordQualities = {true, false, false, true, true, false, false};

    //Boolean vector containing the quality of each chord in a minor scale, with index corresponding to scale degree
    //true=major false=minor
    std::vector<bool> minorScaleChordQualities = {false, false, true, false, false, true, true};

public:
    //Constructor
    ChordModel();

    //Destructor
    virtual ~ChordModel() = default;

    //Builds a chord given a root and a key signature
    virtual void buildChord(std::string rootName, std::string modName, Key &workingKey);

    //Takes a string describing chord mods and returns associated template int vector
    std::vector<int> modStringToVector(const std::string &quality);

    std::vector<std::string> getAvailableMods();

    std::vector<std::vector<std::string>> getNoteNames();

    std::vector<std::string> getNotes();

    std::string getQuality();

    std::string getName();

    std::string getRNA();
};

#endif //CHORD_H
