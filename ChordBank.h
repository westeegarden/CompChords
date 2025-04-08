#ifndef CHORDBANK_H
#define CHORDBANK_H

#include "Chord.h"
#include "Triad.h"
#include "Key.h"
#include <vector>
#include <memory>
using namespace std;

class ChordBank {
private:
    bool isFlatKey{};
    vector<Chord> chordList;

public:
    //Constructors
    ChordBank();
    explicit ChordBank(Key currentKey);

    //Getter
    vector<Chord> getChords();

    //Resets chord bank
    void reset(Key currentKey);

    //For printing to console
    void printChordBank(ostream& outs);
};



#endif //CHORDBANK_H
