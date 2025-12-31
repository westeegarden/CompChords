// frontend/src/App.js
import React, { useEffect, useState } from "react";

function App() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:18080/api/info") // Crow endpoint
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch((err) => console.error(err));
  }, []);

  if (!info) return <div>Loading...</div>;

  return (
    <div>
      <h1>{info.name}</h1>
      <p>Language: {info.language}</p>
      <p>Framework: {info.framework}</p>
    </div>
  );
}

export default App;
