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
        answer: "To get started, choose a key signature to write your chord progression in using the key signature selector on the left. Next build a chord using the chord builder. Feel free to experiment, there are no 'wrong' chords! To start writing your progression, drag the chord from the chord builder onto the track on the right, and press the play button to hear it.",
    },
    {
        question: "Understanding the Key Signature Selector",
        answer: "The key signature selector allows you to choose the key for your chord progression. If you're new to key signatures, think of it as a set of rules that dictates which notes can be played. First, select a key center. This is the 'home note' that your progression will revolve around. Next, choose a key quality. For the purposes of this app, your options are between major and natural minor. Once you've selected a key signature, the notes in that key are displayed below the dropdowns. To gain a better understanding of how major and minor keys differ, start off with the key of C Major, which has no sharps or flats. Then, change the key quality to minor and notice how the notes change.",
    },
    {
        question: "Understanding the Chord Builder",
        answer: "To build a chord to add to your progression, start by selecting a root note using the 'root' dropdown. Once a root is chosen, a 'general quality' is displayed. This is a generalization of the type of chord you will be building, not a technical specification. 'Major' means the chord will have a brighter sound, 'minor' means the chord will have a darker sound. After taking note of the general quality, you're ready to complete your chord by selecting from the 'mods/extensions' dropdown. Again, feel free to experiment, there are no 'wrong' chords! Now the chord name and the notes that make up the chord are displayed in the blue box below the dropdowns. Drag and drop this onto the bottom section of the track and you're good to go!",
    },
    {
        question: "Understanding the Piano Roll",
        answer: "The piano roll consists of two parts, the piano roll and the chord timeline. We will start with the chord timeline. This is where you arrange you chord progression. Chords can be dragged to any position, resized, or dragged to the trash can to be deleted.",
    },
    {
        question: "Key Changes",
        answer: "The playback cursor indicates the current position in the timeline.",
    },
    {
        question: "Example Chord Progressions",
        answer: "Your progress is automatically saved in your browser's local storage. You can clear it by clearing your browser data.",
    }
];

export default function InfoModal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-box"
                onClick={(e) => e.stopPropagation()} // prevent overlay click from closing when clicking inside
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