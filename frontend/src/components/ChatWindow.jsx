import { useEffect, useRef } from 'react';

function ChatWindow({ messages, currentUser }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      style={{
        height: '60vh',
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '1rem',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {messages.map((msg, i) => {
        const isMine = msg.username === currentUser;
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: isMine ? 'flex-end' : 'flex-start',
              marginBottom: '0.75rem',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                backgroundColor: isMine ? '#dcf8c6' : '#fff',
                padding: '0.75rem 1rem',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <strong style={{ color: '#555' }}>{msg.username}</strong>
              <div style={{ margin: '4px 0', whiteSpace: 'pre-wrap' }}>{msg.message}</div>
              <div style={{ fontSize: '0.7rem', textAlign: 'right', color: '#888' }}>
                {new Date(msg.timestamp).toLocaleString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;
