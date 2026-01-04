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
    vector<vector<string>> keyNames = {{"A", "1"}, {"A#", "Bb", "2"}, {"B", "3"}, {"C", "4"}, {"C#", "Db", "5"},
                                          {"D", "6"}, {"D#", "Eb", "7"}, {"E", "8"}, {"F", "9"}, {"F#", "Gb", "10"},
                                          {"G", "11"}, {"G#", "Ab", "12"}};
    bool isFlatScale{};

public:
    //Constructor
    Key();

    //Setting key signature
    void setKey(int center, const string &quality, bool flats);

    //Returns vector of notes in working key
    vector<string> getWorkingKey();

    //Returns the name of the working key
    string getName();

    //Returns boolean true if key uses flats, false otherwise
    [[nodiscard]] bool getIsFlatScale() const;

    //Returns a string vector of the sharps or flats included in the scale
    vector<string> getSharpsOrFlats();
};

#endif //KEY_H

