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
void Key::setKey(const string &centerString, const string &quality) {

 // Reset fields
 notes.clear();
 sharpsOrFlats.clear();
 keyCenter.clear();
 keyQuality.clear();
 isFlatScale = false;

 vector<int> workingKeyQuality;

 //Determine Key Quality
 if (quality == "major") {
  workingKeyQuality = majorKey;
 } else if (quality == "minor") {
  workingKeyQuality = minorKey;
 }
 else {
  throw runtime_error("Invalid quality: " + quality);
 }

 //Determine value of isFlatScale
 isFlatScale = true;
 const string refName = centerString + quality;
 for (const string& s : sharpKeys) {
  if (s == refName) {
   isFlatScale = false;
  }
 }

 //Convert center string to int for processing
 int center = 0;

 for (size_t j = 0; j < keyNames.size(); j++) {
  const auto& spellings = keyNames[j];

  // If scale uses flats
  if (isFlatScale && spellings.size() > 1 && spellings[1] == centerString) {
   center = static_cast<int>(j);
   break;
  }
  if (isFlatScale && spellings.size() < 2 && spellings[0] == centerString) {
   center = static_cast<int>(j);
   break;
  }
  if (!isFlatScale && spellings[0] == centerString) {
   center = static_cast<int>(j);
   break;
  }
 }


 // Fill notes vector
 for (int i : workingKeyQuality) {
  vector<string> note = keyNames[((center + i) % 12)];
  // If key uses flats
  if (isFlatScale && note.size() > 1) {
    notes.push_back(note[1]);
    sharpsOrFlats.push_back(note[1]);
  }
  // If key uses sharps
  else if (note.size() > 1) {
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

string Key::getQuality() {
 return keyQuality;
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
