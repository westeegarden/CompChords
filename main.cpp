#include "Key.h"
#include "Chord.h"
#include "Measure.h"
#include "Track.h"
#include <iostream>
#include <filesystem>
#include "ChordBank.h"
#include "webview/webview.h"
using namespace std;

bool nextStep(ostream &outs, istream &ins, Key& currentKey, Track& currentTrack, ChordBank& currentChordBank);

int main() {
    //Declarations
    Key key;
    Track track;

    //Startup intro
	cout << "########  ########" << endl;
	cout << "##    ##  ##    ##" << endl;
	cout << "##        ##      " << endl;
	cout << "##        ##      " << endl;
	cout << "##    ##  ##    ##" << endl;
    cout << "########  ########" << endl << endl;
    cout << "Welcome to compatible chords!" << endl;

    //Determine working key
    key.getInput(cin, cout);
    key.printKey(cout);

    //Building and printing chords
    ChordBank chordBank(key);
    chordBank.printChordBank(cout);

    //Global function loop for rest of program
    bool programRunning = true;
    while (programRunning) {
        programRunning = nextStep(cout, cin, key, track, chordBank);
    }

    return 0;
}

bool nextStep(ostream &outs, istream &ins, Key& currentKey, Track& currentTrack, ChordBank& currentChordBank) {
    bool invalidInput = true;
    bool stillGoing = true;
    string choice;

    //Printing options
    outs << endl;
    outs << "Enter: '1' to add a measure to track" << endl;
    outs << "       '2' to print chord bank" << endl;
    outs << "       '3' to change key signature" << endl;
    outs << "       '4' to render track as sheet music" << endl;
    outs << "       '5' to quit program" << endl;
    outs << "Your choice: ";

    //Getting user input and validating
    getline(ins, choice);
    while (invalidInput) {
        if (choice.empty()) {
            outs << "No input. Try again: ";
            getline(ins, choice);
        }
        else if (choice == "1") {
            invalidInput = false;
            currentTrack.addMeasure(outs, ins, currentChordBank);
            currentTrack.printTrack(outs);
        }
        else if (choice == "2") {
            invalidInput = false;
            currentChordBank.printChordBank(outs);
        }
        else if (choice == "3") {
            invalidInput = false;
            currentKey.getInput(ins, outs);
            currentChordBank.reset(currentKey);
            currentKey.printKey(outs);
            currentChordBank.printChordBank(outs);
        }
        else if (choice == "4") {
            invalidInput = false;
			currentTrack.renderChords(currentKey);
        }
        else if (choice == "5") {
            invalidInput = false;
            stillGoing = false;
        }
        if (invalidInput) {
            outs << "Invalid input. Try again: ";
            getline(ins, choice);
        }
    }
    return stillGoing;
}

