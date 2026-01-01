// frontend/src/App.js
import React, { useEffect, useState } from "react";

function App() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:18080/api/keySig") // Crow endpoint
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch((err) => console.error(err));
  }, []);

  if (!info) return <div>Loading...</div>;

  return (
    <div>
      <h1>Key Signature: {info.name}</h1>
      <p>Notes: {info.notes}</p>
    </div>
  );
}

export default App;
