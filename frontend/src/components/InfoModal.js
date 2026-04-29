// InfoModal.jsx
import { useState } from "react";
import "../styles/InfoModal.css";

function AccordionItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`accordion-item ${isOpen ? "open" : ""}`}>
            <button
                className="accordion-question"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
                <div className="accordion-answer">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
}

const FAQ = [
    {
        question: "How to get started",
        answer: "To get started, choose a key signature to write your chord progression in using the key signature selector on the left. Next build a chord using the chord builder. Feel free to experiment, there are no 'wrong' chords! To start writing your progression, drag the chord from the chord builder onto the track on the right, and press the play button to hear it. Playback start/stop can also be controlled with the spacebar.",
    },
    {
        question: "Understanding the Key Signature Selector",
        answer: "The key signature selector allows you to choose the key for your chord progression. If you're new to key signatures, think of it as a set of rules that dictates which notes can be played. First, select a key center. This is the 'home note' that your progression will revolve around. Next, choose a key quality. For the purposes of this app, your options are between major and natural minor. Once you've selected a key signature, the notes in that key are displayed below the dropdowns. To gain a better understanding of how major and minor keys differ, start off with the key of C Major, which has no sharps or flats. Then, change the key quality to minor and notice how the notes change.",
    },
    {
        question: "Understanding the Chord Builder",
        answer: "To build a chord to add to your progression, start by selecting a root note using the 'root' dropdown. Once a root is chosen, a 'general character' is displayed. This is a generalization of the type of chord you will be building, not a technical specification. 'Major' means the chord will have a brighter sound, 'minor' means the chord will have a darker sound. After taking note of the general character, you're ready to complete your chord by selecting from the 'mods/extensions' dropdown. Again, feel free to experiment, there are no 'wrong' chords! Now the chord name and the notes that make up the chord are displayed in the blue box below the dropdowns. Drag and drop this onto the bottom section of the track and you're good to go!",
    },
    {
        question: "Understanding the Track",
        answer: "The track component consists of two parts, the piano roll and the chord timeline. We will start with the chord timeline. This is where you arrange you chord progression. Chords can be dragged to any position, resized, or dragged to the trash can to be deleted. The piano roll displays the notes in your progression for reference. Try playing the displayed notes at different places on a piano keyboard to see how inversions of the chord sound! If you want to paste your progression directly into a DAW, click the download button to export a midi file.",
    },
    {        question: "Understanding Piano Roll Note Color Coding",
        answer: "Notes in each chord are color coded to convey their relationship with the chord and key. The root note of each chord is colored red, this is the home base of the chord. Other notes in the chord are colored orange. If a note is included in a chord but is outside of the key signature, it is colored yellow.",
    },
    {
        question: "Understanding Chord Scoring",
        answer: "Each built chord is given a score based on how well it fits within the selected key signature. A lower score does not necessarily mean a chord is a poor choice. In blues, the dominant 7th chord is used extensively and is crucial to the sound. This will result in less than perfect scores in CompChords because of the flat 7th, which is okay! The score is a good metric to guage how much tension a chord will bring to the progression.",
    },
    {
        question: "Key Changes",
        answer: "A good way to make your progression more interesting is to implement key signature changes. Changing the key signature sets you up with a whole new set of notes and chords to work with. Changing keys in CompChords is as east as it sounds, simply select a new key in the key signature selector, and the chord builder will automatically update. You can track key changes by looking at the key signature bar at the bottom of chord objects in the timeline.",
    },
    {
        question: "Example Chord Progressions",
        answer: "Here are some examples of chord progressions to get you started. One of the most common cadential movements is the II-V-I (2-5-1). In the key of C, this would be Dm7 - G7 - Cmaj7. Another easy progression is the 12-bar blues. In the key of C, this would be: C7 - C7 - C7 - C7 - F7 - F7 - C7 - C7 - G7 - F7 - C7 - G7.",
    }
];

export default function InfoModal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-box"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="modal-header">
                    <h2>Help</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    {FAQ.map((item, i) => (
                        <AccordionItem
                            key={i}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}