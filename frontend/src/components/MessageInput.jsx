import { useState } from 'react';

function MessageInput({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'sticky',
        bottom: 0,
        backgroundColor: '#fff',
        padding: '0.5rem 0',
      }}
    >
      <input
        type="text"
        value={message}
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
        style={{
          flex: 1,
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '0.5rem 1.2rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
