#include "Track.h"
#include "Chord.h"
#include <iostream>
#include <fstream>
#include <sstream>
//using namespace std;

Track::Track() = default;

/*
 * addMeasure
 * Requires: ostream, istream, ChordBank
 * Modifies: measures vector
 * Returns: nothing
 * Adds a measure to the track
 */ 
void Track::addMeasure(ostream &outs, istream &ins, ChordBank& currentChordBank) {
    //Creating measure and filling it with chords
    Measure m(4);
    m.fillMeasure(outs, ins, currentChordBank);
    measures.push_back(m);
}

bool Track::isTrackStarted() {
    return trackStarted;
}

void Track::printTrack(ostream &outs) {
    outs << endl << "Your Track:" << endl;  
    for (auto & measure : measures) {
        measure.printMeasure(outs);
        outs << endl;
    }
}


/*
 * renderChords
 * Requires: track to have at least a measure
 * Modifies: nothing
 * Returns: nothing
 * Renders the track as sheet music with html
 */
void Track::renderChords(Key currentKey) {
    
	vector<char *> sharpKeyNoteNames = { R"("c/4")", R"("c/4")", R"("d/4")", R"("d/4")", R"("e/4")", R"("f/4")", R"("f/4")", 
                                         R"("g/4")", R"("g/4")", R"("a/4")", R"("a/4")", R"("b/4")" };

	vector<char*> flatKeyNoteNames = { R"("c/4")", R"("d/4")", R"("d/4")", R"("e/4")", R"("e/4")", R"("f/4")", R"("g/4")",
										R"("g/4")", R"("a/4")", R"("a/4")", R"("b/4")", R"("b/4")" };

	vector<char*> noteLengths = { R"("q")", R"("h")", R"("h.")", R"("w")" };

    //Generating html file
	ofstream outFile("sheet_music.html");

	//Creating html content
    outFile << R"(
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Chords</title>
    <script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        #score {
            border: 5px solid black;
            margin: 20px;
        }
    </style>
</head>
<body>
    <div id="output"></div>

    <script>
        // This approach to importing classes works in CJS contexts (i.e., a regular <script src="..."> tag).
        const { Stave, StaveNote, Beam, Formatter, Renderer } = Vex;

        // Create an SVG renderer and attach it to the DIV element with id="output".
        const div = document.getElementById("output");
        const renderer = new Renderer(div, Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(1500, 1500);
        const context = renderer.getContext();

        )";

    // Generating javascript for chord progressoin
    for (int i = 0; i < measures.size(); i++) {
        outFile << R"(const staveMeasure)" + to_string(i) + R"( = new Stave()";
        // If measure is first, add key signature and treble cleff
		if (i == 0) {
            outFile << R"(10, 0, 300);
        )";
            string keyName = currentKey.getWorkingKeyVF();
			outFile << R"(staveMeasure)" + to_string(i) + R"(.addClef("treble").addKeySignature(")" << keyName << R"(").setContext(context).draw();
        )";
		}
		// If measure is not first, align with previous measure
        else {
			outFile << R"(staveMeasure)" + to_string(i - 1) + R"(.width + staveMeasure)" << to_string(i - 1) << R"(.x, 0, 300);
        )";
			outFile << R"(staveMeasure)" + to_string(i) + R"(.setContext(context).draw();
        )";
        }
        outFile << R"(const notesMeasure)" + to_string(i) + R"( = [)";

		for (int j = 0; j < measures[i].getChords().size(); j++) {
            if (!measures[i].getChords()[j].getNotes().empty()) {
                outFile << R"(new StaveNote({keys: [)";

                for (int k = 0; k < measures[i].getChords()[j].getNotes().size(); k++) {
                    if (currentKey.getIsFlatScale()) {
                        outFile << flatKeyNoteNames[(((measures[i].getChords()[j].getNotes()[k] + 9) - 1) % 12)];
                        if (k != measures[i].getChords()[j].getNotes().size() - 1) {
                            outFile << ", ";
                        }
                    }
                    else {
                        if (k < measures[i].getChords()[j].getNotes().size()) {
                            outFile << sharpKeyNoteNames[(((measures[i].getChords()[j].getNotes()[k] + 9) - 1) % 12)];
                        }
                        if (k != measures[i].getChords()[j].getNotes().size() - 1) {
                            outFile << ", ";
                        }
                    }
                }
				// Adding note length
                int length = 1;
				if (measures[i].getChords()[j].getLength() == 2) {
					length = 2;
				}
				else if (measures[i].getChords()[j].getLength() == 3) {
					length = 3;
				}
				else if (measures[i].getChords()[j].getLength() == 4) {
					length = 4;
				}
                outFile << R"(], duration: )" << noteLengths[length - 1] << R"(}))";

                if (j != measures[i].getChords().size() - 1) {
                    outFile << ", ";
                }
            }
		}
		outFile << R"(];
        )" << endl;
		outFile << R"(        Formatter.FormatAndDraw(context, staveMeasure)" << to_string(i) << R"(, notesMeasure)" << to_string(i) << R"();
        )";
    }
    
	// Closing html file
    outFile << R"(
    </script>
</body>
</html>
)";
	outFile.close();

	// Rendering html file with webview
	ifstream inFile("sheet_music.html");
    stringstream buffer;
	buffer << inFile.rdbuf();
	string html_content = buffer.str();
    webview::webview w(false, nullptr);
    w.set_title("Your Chords");
    w.set_size(660, 320, WEBVIEW_HINT_NONE);
    w.set_html(html_content);
    w.run();
}


