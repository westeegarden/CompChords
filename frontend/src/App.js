// frontend/src/App.js
import React from "react";
import Header from "./components/Header";
import KeySigSelect from "./components/KeySigSelect";
import ChordBuilder from "./components/ChordBuilder";

function App() {
  return (
    <div>
      <Header></Header>
      <KeySigSelect />
      <ChordBuilder />
    </div>
  );
}

export default App;
