//
// Created by weste on 1/1/2026.
//
#ifndef KEY_H
#define KEY_H
#include <vector>
#include <string>
using namespace std;

/*--------Key Class Header--------*/

class Key {
private:
    //Fields
    //Contains key center name and value
    string keyCenter;

    //Denotes key as major or minor
    string keyQuality;

    //Contains string names of notes in scale. Notes are tracked as numbered semitones, A=1, G#=12
    vector<string> notes;

    //Template vectors for each key quality
    const vector<int> majorKey = {0, 2, 4, 5, 7, 9, 11};
    const vector<int> minorKey = {0, 2, 3, 5, 7, 8, 10};

    //Vector for the sharps or flats in a key
    vector<string> sharpsOrFlats;

    //Vector containing all properties of each note
    vector<vector<string>> keyNames = {{"A"}, {"A#", "Bb"}, {"B"}, {"C"}, {"C#", "Db"},
                                          {"D"}, {"D#", "Eb"}, {"E"}, {"F"}, {"F#", "Gb"},
                                          {"G"}, {"G#", "Ab"}};

    //Vector containing the names of keys using sharps for reference
    vector<string> sharpKeys = {"Amajor", "A#major", "A#minor", "Bmajor", "Bminor", "C#major", "C#minor", "Dmajor",
                                "D#major", "D#minor", "Emajor", "Eminor", "F#major", "F#minor", "Gmajor", "G#major", "G#minor"};

    bool isFlatScale;

public:
    //Constructor
    Key();

    //Setting key signature
    void setKey(const string &centerString, const string &quality);

    //Returns vector of notes in working key
    vector<string> getWorkingKey();

    //Returns the name of the working key
    string getName();

    //Returns key quality as a string
    string getQuality();

    //Returns boolean true if key uses flats, false otherwise
    [[nodiscard]] bool getIsFlatScale() const;

    //Returns a string vector of the sharps or flats included in the scale
    vector<string> getSharpsOrFlats();
};

#endif //KEY_H

