#ifndef KEY_H
#define KEY_H
#include <vector>
#include <string>
using namespace std;

/*--------Key Class Header--------*/

class Key {
private:
    //Fields
    //Contains key center name and value
    vector<string> keyCenter = {"", ""};

    //Denotes key as major or minor
    string keyQuality;

    //Contains int value for all notes in scale. Notes are tracked as numbered semitones, A=1, G#=12
    vector<int> notes;

    //Template vectors for each key quality
    const vector<int> majorKey = {0, 2, 4, 5, 7, 9, 11};
    const vector<int> minorKey = {0, 2, 3, 5, 7, 8, 10};

    //Vector containing all properties of each note
    vector<vector<string>> keyNames = {{"A", "1"}, {"A#", "Bb", "2"}, {"B", "3"}, {"C", "4"}, {"C#", "Db", "5"},
                                          {"D", "6"}, {"D#", "Eb", "7"}, {"E", "8"}, {"F", "9"}, {"F#", "Gb", "10"},
                                          {"G", "11"}, {"G#", "Ab", "12"}};
    bool isFlatScale{};

public:
    //Constructor
    Key();

    //Getting user input to set key signature
    void getInput(istream &ins, ostream &outs);

    //Setting key signature
    void setKey(int center, string quality);

    //Print working key and notes in scale
    void printKey(ostream &outs);

    //Returns vector containing each note property
    vector<vector<string>> getKeyNames();

    //Returns vector of notes in working key
    vector<int> getWorkingKey();

    //Returns boolean true if key uses flats, false otherwise
    bool getIsFlatScale() const;

    //Returns working key in vexflow format
    string getWorkingKeyVF();
};

#endif //KEY_H
