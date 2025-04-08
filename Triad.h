#ifndef TRIAD_H
#define TRIAD_H

#include "Chord.h"
#include <vector>
#include <string>
using namespace std;

/*--------Triad Class Header--------*/

class Triad : public Chord {
protected:
    //Template vectors for each chord quality
    vector<int> maj = {1, 5, 8};
    vector<int> min = {1, 4, 8};
    vector<int> dim = {1, 4, 7};
    vector<vector<int>> qualities = {maj, min, dim};

    //Vector containing names of types of chords
    vector<string> chordNames = {"Maj", "min", "dim"};

    //Vector containing roman numerals for each scale degree
    vector<string> romanNumerals = { "I", "II", "III", "IV", "V", "VI", "VII" };

public:
    //Constructor
    Triad();

    //Builds a chord given a root and a key signature
    void buildChord(int root, int rna, vector<int> keySignature, bool flatScale) override;

    void printChord(ostream &outs, bool flatScale) override;
};



#endif //TRIAD_H
