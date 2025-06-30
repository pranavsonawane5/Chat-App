import { useEffect, useState, useRef} from 'react';
import UsernamePrompt from './components/UsernamePrompt';

function App() {
  const[username,setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);
  
  useEffect(()=>{
    if(username){
      const socket = new WebSocket('ws://localhost:4000');
      ws.current = WebSocket;

      socket.onopen = () => {
        console.log('Connected to websocket');
        setConnected(true);
        socket.send(JSON.stringify({type:'init', username}));
      };

      socket.onerror = (err) => {
        console.error('Websocket error', err);
      };

      socket.onclose = () => {
        console.log('Disconnected from Websocket');
        setConnected(false);
      };
      
      return () => socket.close();
    }
  },[username]);

    if (!username){
      return <UsernamePrompt onSubmit={setUsername}/>;
  }

  return(
    <div style={{padding:'2rem', fontFamily:'Arial'}}>
      <h1>Websocket test</h1>
      <p>Status: {connected? 'Connected' : 'Disconnected'}</p>
    </div>
  );
}

export default App;