#ifndef CHORD_H
#define CHORD_H

#include <vector>
#include <string>
using namespace std;

/*--------Chord Class Header--------*/

class Chord {
protected:
    //Fields
    string currentChordName;
	string romanNumeral;
    int length;

    //Contains int values of notes in chord
    vector<int> notes;

    //Template vectors for each chord quality
    vector<int> maj7 = {1, 5, 8, 12};
    vector<int> min7 = {1, 4, 8, 11};
    vector<int> seven = {1, 5, 8, 11};
    vector<int> min7b5 = {1, 4, 7, 11};
    vector<int> dim7 = {1, 4, 6, 10};
    vector<vector<int>> qualities = {maj7, min7, seven, min7b5, dim7};

    //Vector containing names of types of chords
    vector<string> chordNames = {"Maj7", "min7", "7", "min7b5", "dim7"};

    //Vector containing properties of each note
    vector<vector<string>> noteNames = {{"A", "1"}, {"A#", "Bb", "2"}, {"B", "3"}, {"C", "4"}, {"C#", "Db", "5"},
                                          {"D", "6"}, {"D#", "Eb", "7"}, {"E", "8"}, {"F", "9"}, {"F#", "Gb", "10"},
                                          {"G", "11"}, {"G#", "Ab", "12"}};

    //Vector containing roman numerals for each scale degree
	vector<string> romanNumerals = { "I7", "II7", "III7", "IV7", "V7", "VI7", "VII7" };

public:
    //Constructor
    Chord();

    //Destructor
    virtual ~Chord() = default;

    //Builds a chord given a root and a key signature
    virtual void buildChord(int root, int rna, vector<int> keySignature, bool flatScale);

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
