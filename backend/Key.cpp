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
void Key::setKey(int center, string quality, bool flats) {
 //set flat key bool
 isFlatScale = flats;

 //Major keys
 if (quality == "Major") {
  for (int i : majorKey) {
   vector<string> note = keyNames[((center + i - 1) % 12 + 1)];
   if (flats && note.size() > 2) {
    notes.push_back(note[1]);
   }
   else {
    notes.push_back(note[0]);
   }
  }
 }
 //Minor keys
 else if (quality == "minor") {
  for (int i : minorKey) {
   vector<string> note = keyNames[((center + i - 1) % 12)];
   if (flats && note.size() > 2) {
    notes.push_back(note[1]);
   }
   else {
    notes.push_back(note[0]);
   }
  }
 }

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


