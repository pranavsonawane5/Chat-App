import { useState } from 'react';

function UsernamePrompt({ onSubmit }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      onSubmit(username.trim());
    }
  };

  return (
    <div
      style={{
        padding: '3rem',
        fontFamily: 'Segoe UI, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <h2 style={{ marginBottom: '1.5rem' }}>Enter your username to join the chat</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="e.g., Pranav"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '0.6rem 1rem',
            width: '220px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem 1.5rem',
            borderRadius: '20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Join Chat
        </button>
      </form>
    </div>
  );
}

export default UsernamePrompt;
