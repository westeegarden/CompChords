//
// Created by weste on 1/1/2026.
//
#include "../domain/Key.h"
#include "../domain/Chord.h"
#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    Key k;
    k.setKey("Bb", "minor");
    vector<string> notes = k.getWorkingKey();

    cout << "Testing Key class...\n";

    // Testing getName()
    if (k.getName() != "Bb minor") {
        cerr << "FAIL: Expected name Bb minor, got " << k.getName() << endl;
        return 1;
    }

    // Testing getWorkingKey()
    if (notes.size() != 7) {
        cerr << "FAIL: Expected 7 notes, got " << notes.size() << "\n";
        return 1;
    }

    if (notes[0] != "Bb") {
        cerr << "FAIL: Expected first note to be Bb, got " << notes[0] << "\n";
        return 1;
    }

    if (notes[1] != "C") {
        cerr << "FAIL: Expected second note to be C, got " << notes[1] << "\n";
        return 1;
    }

    if (notes[2] != "Db") {
        cerr << "FAIL: Expected third note to be Db, got " << notes[2] << "\n";
        return 1;
    }

    if (notes[3] != "Eb") {
        cerr << "FAIL: Expected fourth note to be Eb, got " << notes[3] << "\n";
        return 1;
    }

    if (notes[4] != "F") {
        cerr << "FAIL: Expected third note to be F, got " << notes[4] << "\n";
        return 1;
    }

    if (notes[5] != "Gb") {
        cerr << "FAIL: Expected third note to be Gb, got " << notes[5] << "\n";
        return 1;
    }

    if (notes[6] != "Ab") {
        cerr << "FAIL: Expected third note to be Ab, got " << notes[6] << "\n";
        return 1;
    }

    // Testing getIsFlatScale
    if (k.getIsFlatScale() != true) {
        cerr << "FAIL: Expected flat scale to be true\n";
        return 1;
    }

    // Testing getSharpsOrFlats
    vector<string> testFlats = {"Bb", "Db", "Eb", "Gb", "Ab"};
    if (k.getSharpsOrFlats() != testFlats) {
        cerr << "FAIL: Expected flats to be [Bb, Db, Eb, Gb, Ab], got something else\n";
        return 1;
    }

    //Key tests passed
    cout << "PASS\n";

    // Testing Chords in key of C ==========================================================================
    Key k2;
    k2.setKey("C", "major");
    Chord c;
    c.buildChord("E", "min7", k2);

    cout << "Testing Chord class...\n";

    //Testing chord name is correct on minor scale degree
    if (c.getName() != "Emin7") {
        cerr << "FAIL: Expected chord name Emin7, got: " << c.getName() << endl;
        return 1;
    }

    //Testing RNA is correct
    if (c.getRNA() != "iii") {
        cerr << "FAIL: Expected RNA iii, got " << c.getRNA() << "\n";
        return 1;
    }

    //Testing mod string to vector function
    vector<int> testVect = {1, 4, 8, 11};
    if (c.modStringToVector("min7") != testVect) {
        cerr << "FAIL: Expected returned vector to be {1, 4, 8, 11}, got " << testVect.data() << endl;
        return 1;
    }

    //Testing that correct notes are assigned
    vector<string> testVect2 = {"E", "G", "B", "D"};
    if (c.getNotes() != testVect2) {
        cerr << "FAIL: Expected returned vector to be {E, G, B, D}, got: { ";
        for (const auto& note : c.getNotes()) {
            cerr << note << " ";
        }
        cerr << "}\n";
        return 1;
    }

    //Testing major triad and "none" mod
    c.buildChord("C", "none", k2);
    vector<string> testVect3 = {"C", "E", "G"};
    if (c.getNotes() != testVect3) {
        cerr << "FAIL: Expected returned vector to be {C, E, G}, got: { ";
        for (const auto& note : c.getNotes()) {
            cerr << note << " ";
        }
        cerr << "}\n";
        return 1;
    }

    //Testing getAvailableMods()
    vector<string> testVec4 = {"none", "aug", "Maj7", "7", "aug7", "Maj9", "Maj9#11",
                                "9", "7b9", "7#9", "7#11", "6"};
    if (c.getAvailableMods() != testVec4) {
        cerr << "FAIL: Expected full major mods vector, got: { ";
        for (const auto& mod : c.getAvailableMods()) {
            cerr << mod << " ";
        }
        cerr << "}\n";
        return 1;
    }
    cout << "PASS\n";
    return 0;
}
