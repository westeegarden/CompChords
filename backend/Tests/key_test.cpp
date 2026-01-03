//
// Created by weste on 1/1/2026.
//
#include "../Key.h"
#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    Key k;
    k.setKey(2, "minor", true);
    vector<string> notes = k.getWorkingKey();

    cout << "Testing Key class...\n";

    // Testing getName()
    if (k.getName() != "Bb minor") {
        cerr << "FAIL: Expected name Bb minor, got " << k.getName() << endl;
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
    }

    std::cout << "PASS\n";
    return 0;
}
