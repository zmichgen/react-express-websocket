import React, {useState} from "react";

const SendMessage = ({sendMessage}) => {
    const [message, setMessage] = useState("");

    const onSend = () => {
        sendMessage(message);
        setMessage("");
    };

    return (
        <div>
            <input value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={onSend}>Send</button>
        </div>
    )
};

export default SendMessage;
