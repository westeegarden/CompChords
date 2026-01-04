//
// Created by weste on 1/1/2026.
//
#include "Key.h"
#include <iostream>
#include <string>
using namespace std;

/*--------Key Class--------*/

//Default constructor
Key::Key() = default;

/*
 * SetKey sets the notes and name of the key
 * @param center: the name of the key center
 * @param quality: the scale quality (major/minor)
 * @return: void
 */
void Key::setKey(int center, const string &quality, bool flats) {
 //set flat key bool
 isFlatScale = flats;
 vector<int> workingKeyQuality;

 //Determine Key Quality
 if (quality == "Major") {
  workingKeyQuality = majorKey;
 } else if (quality == "minor") {
  workingKeyQuality = minorKey;
 }
 // Fill notes vector
 for (int i : workingKeyQuality) {
  vector<string> note = keyNames[((center + i - 1) % 12)];
  // If key uses flats
  if (flats && note.size() > 2) {
    notes.push_back(note[1]);
    sharpsOrFlats.push_back(note[1]);
  }
  // If key uses sharps
  else if (note.size() > 2) {
    notes.push_back(note[0]);
    sharpsOrFlats.push_back(note[0]);
  }
  // If key has none
  else {
   notes.push_back(note[0]);
  }
 }
 //Minor keys
 keyCenter = notes[0];
 keyQuality = quality;
}

/*
 * getWorkingKey returns the names of all the notes in the scale
 * @param: none
 * @returns: string vector of notes
 */
vector<string> Key::getWorkingKey() {
 return notes;
}

/*
 * getName returns the name of the key signature
 * @param: none
 * @returns: string name of key
 */
string Key::getName() {
 return string(keyCenter) + " " + keyQuality;
}

/*
 * getIsFlatScale returns true if scale uses flats, false for sharps
 * @param: none
 * @returns: bool isFlatScale
 */
bool Key::getIsFlatScale() const {
 return isFlatScale;
}

/*
 * getSharpsOrFlats returns a string vector of the sharps or
 * flats included in the working key
 * @param: none
 * @returns: vector<string> sharpsOrFlats
 */
vector<string> Key::getSharpsOrFlats() {
 return sharpsOrFlats;
}
