# Wesley Teegarden M1OEP
## Compatible Chords 
Compatable chords is a music notation software that serves as a tool to help musicians
write music. Music theory is a complex subject, and it can be difficult to keep track
of all the rules and math behind it. With compatible chords, musicians can leave
the calculations to the computer and focus on composing.
  
## The program
The goal of the program is to create a "track", which is effectively a chord progression. On startup,
the user is prompted to input the key signature they wish to work in, after which a chord bank is
generated containing (almost) every chord that fits within that key. At this point, the user is continuously
presented with a menu of options where they can start building their track, view the chord bank for
reference, change keys for a new set of chords, render their chord progression as sheet music, or exit the program.

## Languages and Libraries
I wanted to create a way for
users to view their chord progressions on a treble cleff stave, and after some research, I found [VexFlow](https://github.com/0xfe/vexflow), 
a javascript library that renders sheet music on a html canvas. To keep all processes in one place,
I used [WebView](https://github.com/webview/webview), a library that allows you to render html and javascript
within a C++ program. 
