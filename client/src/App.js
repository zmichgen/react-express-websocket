import React, {useState} from 'react';
import Messages from "./components/Messages";
import SendMessage from "./components/SendMessage";
import './App.css';

const conn = new WebSocket("ws://localhost:9000/");

let userName = '';
conn.onopen =  () => {
    userName = prompt("What is your name?");
};

conn.onclose = () => {
  alert("Websocket off");
};

function App() {
  const [messages, setMessages] = useState([]);

  conn.onmessage = e => e && e.data && setMessages([...messages, JSON.parse(e.data)]);

  const sendMessage = (message) => conn.send(JSON.stringify({ event: "chat-message", payload: { userName, message }}));

  return (
    <div className="App">
        <div className="chatWindow">
            <Messages messages={messages} />
            <SendMessage sendMessage={sendMessage} />
        </div>
    </div>
  );
}

export default App;
