#include "Measure.h"
#include <vector>
#include <memory>
#include <string>
#include <iostream>

using namespace std;

/*
 * Default Constructor
 * Requires: Nothing
 * Initializes: numBeats
 */
Measure::Measure() {
    numBeats = 4;
    for (int i = 0; i < numBeats; i++) {
        chordProgression.emplace_back();
    }
}

/*
 * Constructor
 * Requires: int timeSig
 * Initializes: numBeats
 */
Measure::Measure(const int timeSig) {
    numBeats = timeSig;
    for (int i = 0; i < numBeats; i++) {
        chordProgression.emplace_back();
    }
}

/*
 * addChord
 * Requires: Chord object and int lengthHeld
 * Modifies: chordProgression vector
 * Returns: False if measure is filled, True otherwise
 */
bool Measure::addChord(Chord chord, int length) {
    bool spaceLeft = true;
    if (position + length > numBeats) {
        length = numBeats - position;
        spaceLeft = false;
    }
    chordProgression[position] = chord;
    position += length;
    if (position >= numBeats) {
        spaceLeft = false;
    }
    return spaceLeft;
}

/*
 * fillMeasure
 * Requires: iostream
 * Modifies: chordProgression vector
 * Returns: nothing
 */
void Measure::fillMeasure(ostream &outs, istream &ins, ChordBank &bank) {
    bool spaceLeft = true;
    string input;
    int length = 0;
    int chordListIndex = 0;
    while (spaceLeft) {
        bool invalidInput = true;
        ins.clear();
        //Get chord RNA
        outs << "Enter the RNA of the chord you want to add (Example: II, IV): ";
        getline(ins, input);
        //Input validation
        while (invalidInput) {
            for (int i = 0; i < romanNumerals.size(); i++) {
                if (romanNumerals[i] == input) {
                    chordListIndex = i;
                    invalidInput = false;
                }
            }
            if (invalidInput) {
                outs << "Invalid input. Try again: ";
                getline(ins, input);
            }
        }
        //Get chord length
        outs << "Enter the length of the chord in beats: ";
   
        //Input validation
        invalidInput = true;
        while (invalidInput) {
            getline(ins, input);
            try {
                length = stoi(input);

                if (length > 0 && length <= numBeats) {
                    invalidInput = false;
                }
                else {
                    outs << "Length out of range. Try again: ";
                }
            }
			catch (invalid_argument& e) {
				outs << "Invalid input. Try again: ";
			}
			catch (out_of_range& e) {
				outs << "Invalid input. Try again: ";
			}
        }

        //Adding chord to measure
        Chord chord = bank.getChords()[chordListIndex];
		chord.setLength(length);
        spaceLeft = addChord(chord, length);

        //Print Measure progress
        if (spaceLeft) {
            outs << endl;
            this->printMeasure(outs);
        }
    }
}


/*
 * PrintMeasure prints graphical measure representation
 * Requires: ostream ref
 * Modifies: nothing
 */
void Measure::printMeasure(ostream &outs) {
    //Printing Chord names
    outs << "|";
    for (int i = 0; i < numBeats; i++) {
        string chordName = chordProgression[i].getChordName();
        if (chordProgression[i].getNotes().empty()) {
            outs << "   ---    ";
        }
        else {
            outs << chordName;
            for (int j = 0; j < 10 - chordName.size(); j++) {
                outs << " ";
            }
        }
    }
    outs << "|" << endl;

    //Printing middle line
    outs << "|";
    for (int i = 0; i < numBeats; i++) {
        outs << "---------|";
    }
    outs << endl;

    //Printing RNA
    outs << "|";
    for (int i = 0; i < numBeats; i++) {
        string rna = chordProgression[i].getRNA();
        if (chordProgression[i].getNotes().empty()) {
            outs << "   ---    ";
        }
        else {
            outs << rna;
            for (int j = 0; j < 10 - rna.size(); j++) {
                outs << " ";
            }
        }
    }
    outs << "|" << endl;
}

vector<Chord> Measure::getChords() {
    return chordProgression;
}

int Measure::getNumBeats() const {
    return numBeats;
}
