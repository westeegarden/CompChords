#ifndef MEASURE_H
#define MEASURE_H

#include "Chord.h"
#include "ChordBank.h"
#include <vector>
#include <string>

using namespace std;

/*--------Measure Class Header--------*/

class Measure {
private:
    int numBeats;
    int position = 0;

    //Vector containing chords in measure
    vector<Chord> chordProgression;

    //Vector containing roman numerals for each scale degree
    vector<string> romanNumerals = { "I", "I7", "II", "II7",  "III", "III7",
                                    "IV", "IV7",  "V", "V7", "VI","VI7","VII", "VII7" };

public:
    //Default constructor
    Measure();

    //Constructor that takes int time signature
    explicit Measure(int timeSig);

    //Add a chord to the measure
    bool addChord(Chord chord, int length);

    //Interacts with user to fill measure with chords
    void fillMeasure(ostream& outs, istream& ins, ChordBank& bank);

    //Prints one measure
    void printMeasure(ostream& outs);

    vector<Chord> getChords();

    int getNumBeats() const;
};

#endif // MEASURE_H
