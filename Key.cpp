#include "Key.h"
#include <iostream>
#include <string>
using namespace std;

/*--------Key Class--------*/

//Default constructor
Key::Key() = default;

/*
 *Set Key signature
 *Takes iostream as argument
 *Returns nothing
 *Prompts user to enter key signature with input validation
 *and assigns proper scale degrees
 */
void Key::getInput(istream &ins, ostream &outs) {
    string center;
    string quality;
    bool invalidInput = true;

    notes.clear();

    //Getting input from user for key center
    outs << "Enter key center (Example: F#, Eb, C): ";
    getline(ins, center);

    //Input Validation
    while (invalidInput) {
        //If input is empty
        if (center.empty()) {
            outs << "No input. Enter key center (Example: F#, Eb, C): ";
            getline(ins, center);
        } else {
            //Checking vector of key names to find key center
            for (int i = 0; i < keyNames.size(); i++) {
                //Sharp keys
                if (keyNames[i][0] == center) {
                    invalidInput = false;
                    keyCenter = {keyNames[i][0], keyNames[i][keyNames[i].size() - 1]};
                }
                //Flat keys
                else if (keyNames[i][1] == center) {
                    invalidInput = false;
                    keyCenter[0] = keyNames[i][1];
                    keyCenter[1] = keyNames[i][2];
                }
            }
            if (invalidInput) {
                outs << "Invalid input. Enter key center (Example: F#, Eb, C): ";
                getline(ins, center);
            }
        }
    }

    //Getting input from user for key quality
    outs << "Enter key quality (enter 'major' or 'minor'): ";
    getline(ins, quality);
    invalidInput = true;

    //Input validation
    while (invalidInput) {
        if (quality.empty()) {
            outs << "No input. Enter key quality (enter 'major' or 'minor'): ";
            getline(ins, quality);
        }
        else if (quality == "major") {
            keyQuality = " Major";
            invalidInput = false;
        }
        else if (quality == "minor") {
            keyQuality = " minor";
            invalidInput = false;
        }
        else {
            outs << "Invalid input. Enter key quality (enter 'major' or 'minor'): ";
            getline(ins, quality);
        }
    }

    //Finding if key uses flats or sharps
    if ((center.length() == 2 && center[1] == 'b') || center == "F" ||
        (center == "C" && quality == "minor") || (center == "G" && quality == "minor")) {
        isFlatScale = true;
    }
    //Setting key
    setKey(stoi(keyCenter[1]), keyQuality);
}

void Key::setKey(int center, string quality) {
    //Major keys
    if (quality == " Major") {
        for (int i : majorKey) {
            notes.push_back((center + i - 1) % 12 + 1);
        }
    }
    //Minor keys
    else if (quality == " minor") {
        for (int i : minorKey) {
            notes.push_back((center + i - 1) % 12 + 1);
        }
    }
}

/*
*Prints working key and all notes in scale
*/
void Key::printKey(ostream &outs) {
    string output;
    outs << keyCenter[0] << keyQuality << ": ";
    for (int i = 0; i < notes.size(); i++) {
        if (isFlatScale && keyNames[notes[i] - 1][0][1] == '#') {
            output = keyNames[notes[i] - 1][1];
        }
        else {
            output = keyNames[notes[i] - 1][0];
        }
        outs << output << " ";
    }
    outs << endl;
}

/*
 * Returns vector containing each note property
*/
vector<vector<string>> Key::getKeyNames() {
    return keyNames;
}

/*
 * Returns vector with each note in working key
*/
vector<int> Key::getWorkingKey() {
    return notes;
}

/*
 * Returns isFlatScale boolean true if key uses flats, false otherwise
*/
bool Key::getIsFlatScale() const {
    return isFlatScale;
}

/*
 * Returns working key in vexflow format
*/
string Key::getWorkingKeyVF() {
    string output = keyCenter[0];
	if (keyQuality == " minor") {
		output += "m";
	}
	return output;
}