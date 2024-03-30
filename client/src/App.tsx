import { useState } from 'react';
import './App.css';
import { publishMessage, fetchShadow, updateShadow } from "./IoT";

function App() {
  const [newMessage, setNewMessage] = useState<string>("");

  return (
    <div className="App">
      <h1>AWS IoT Core Demo</h1>
      <h2>AWS User Groups Meetup #60</h2>
      <div>
          <input type="text" id="newMessage" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
          <button onClick={() => publishMessage(newMessage)}>Publish message</button>
      </div>
      <div id="receivedMessages">
          <h3>Received messages:</h3>
      </div>
      <hr/>
      <button onClick={() => fetchShadow()}>Fetch shadow</button>
      <div id="deviceShadow">
          <h3>Received messages:</h3>
      </div>
      <button onClick={() => updateShadow(true)}>Enable feature</button>
      <button onClick={() => updateShadow(false)}>Disable feature</button>
    </div>
  );
}

export default App;
