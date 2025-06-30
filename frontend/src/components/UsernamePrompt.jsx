import {useState} from 'react';

function UsernamePrompt({onSubmit}) {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username.trim()!=='') {
            onSubmit(username.trim());
        }
    };

    return (
        <div style={{padding:'2rem', fontFamily:'Arial'}}>
            <h2>Enter your username</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Pranav'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{padding:'0.5rem', width:'200px'}}
                />
                <button type='Submit' style={{marginLeft:'1rem', padding:'0.5rem'}}>
                    Join Chat
                </button>
            </form>
        </div>
    );
}

export default UsernamePrompt;