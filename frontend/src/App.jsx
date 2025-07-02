import { useEffect, useState, useRef} from 'react';
import UsernamePrompt from './components/UsernamePrompt';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

function App() {
  const[username,setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);
  
  useEffect(()=>{
    if(username){
      
      const socket = new WebSocket('wss://chat-backend-c7xe.onrender.com');
      ws.current = socket;

      socket.onopen = () => {
        console.log('Connected to websocket');
        setConnected(true);
        socket.send(JSON.stringify({type:'init', username}));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if(data.type === 'history') {
          setMessages(data.messages);
        }

        if(data.type === 'message') {
          setMessages((prev) => [...prev,data]);
        }
      };

      socket.onerror = (err) => {
        console.error('Websocket error', err);
      };

      socket.onclose = () => {
        console.log('Websocket Disconnected');
        setConnected(false);
      };

      return () => socket.close();
    }
  },[username]);

  const handleSendMessage = (msgText) => {
    if(ws.current && ws.current.readyState === WebSocket.OPEN){
      ws.current.send(
        JSON.stringify({
          type:'message',
          message: msgText,
        })
      );
    }
  };

    if (!username){
      return <UsernamePrompt onSubmit={setUsername}/>;
  }

  return(
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Welcome, {username}</h2>
      <p>Status: {connected ? 'Online' : 'Disconnected'}</p>
      <ChatWindow messages={messages} currentUser={username}/>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}

export default App;