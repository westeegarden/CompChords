// frontend/src/App.js
import React from "react";
import Header from "./components/Header";
import KeySigSelect from "./components/KeySigSelect";
import ChordBuilder from "./components/ChordBuilder";
import Track from "./components/Track";

function App() {
  return (
    <div>
      <Header></Header>
      <KeySigSelect />
      <ChordBuilder />
      <Track />
    </div>
  );
}

export default App;
