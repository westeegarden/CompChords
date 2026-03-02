//
// Created by weste on 1/1/2026.
//
#ifndef KEY_H
#define KEY_H
#include <vector>
#include <string>

/*--------Key Class Header--------*/

class Key {
private:
    //Fields
    //Contains key center name and value
    std::string keyCenter;

    //Denotes key as major or minor
    std::string keyQuality;

    //Contains string names of notes in scale. Notes are tracked as numbered semitones, A=1, G#=12
    std::vector<std::string> notes;

    //Template vectors for each key quality
    const std::vector<int> majorKey = {0, 2, 4, 5, 7, 9, 11};
    const std::vector<int> minorKey = {0, 2, 3, 5, 7, 8, 10};

    //Vector for the sharps or flats in a key
    std::vector<std::string> sharpsOrFlats;

    //Vector containing all properties of each note
    std::vector<std::vector<std::string>> keyNames = {{"A"}, {"A#", "Bb"}, {"B"}, {"C"}, {"C#", "Db"},
                                          {"D"}, {"D#", "Eb"}, {"E"}, {"F"}, {"F#", "Gb"},
                                          {"G"}, {"G#", "Ab"}};

    //Vector containing the names of keys using sharps for reference
    std::vector<std::string> sharpKeys = {"Amajor", "A#major", "A#minor", "Bmajor", "Bminor", "C#major", "C#minor", "Dmajor",
                                "D#major", "D#minor", "Emajor", "Eminor", "F#major", "F#minor", "Gmajor", "G#major", "G#minor"};

    bool isFlatScale;

public:
    //Constructor
    Key();

    //Setting key signature
    void setKey(const std::string &centerString, const std::string &quality);

    //Returns vector of notes in working key
    std::vector<std::string> getWorkingKey();

    //Returns the name of the working key
    std::string getName();

    //Returns key quality as a string
    std::string getQuality();

    //Returns boolean true if key uses flats, false otherwise
    [[nodiscard]] bool getIsFlatScale() const;

    //Returns a string vector of the sharps or flats included in the scale
    std::vector<std::string> getSharpsOrFlats();
};

#endif //KEY_H

