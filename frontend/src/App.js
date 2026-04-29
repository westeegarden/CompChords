// frontend/src/App.js
import React from "react";
import Header from "./components/Header";
import KeySigSelect from "./components/KeySigSelect";
import ChordBuilder from "./components/ChordBuilder";
import Track from "./components/Track";

function App() {
  const [keyCenter, setKeyCenter] = React.useState("C");
  const [keyQuality, setKeyQuality] = React.useState("major");

  return (
    <div>
      <Header></Header>
      <div style={{ display: "flex", 
                    flexDirection: "row", 
                    width: "100%",
                    height: "100%" }}>
        <div style={{ height: "100%" }}>
          <KeySigSelect
            keyCenter={keyCenter}
            keyQuality={keyQuality}
            onKeyChange={(center, quality) => {
              setKeyCenter(center);
              setKeyQuality(quality);
            }}
          />
          <ChordBuilder keyCenter={keyCenter} keyQuality={keyQuality} />
        </div>
        <div style={{ flex: 1 }}>
          <Track />
        </div>
      </div>
    </div>
  );
}

export default App;
