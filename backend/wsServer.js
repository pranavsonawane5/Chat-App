const WebSocket = require('ws');
const Message = require('./models/Message');

function setupWebSocket(server){
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        let username = '';

        //when client sends message
        ws.on('message', async(msg) =>{
            try {
                const data = JSON.parse(msg);

                if(data.type === 'init')
                {
                    username = data.username;

                    //send last 50 msg if it exist
                    const history = await Message.find()
                    .sort({timestamp: -1})
                    .limit(50)
                    .lean();

                    ws.send(JSON.stringify({
                        type:'history',
                        messages: history.reverse(),
                    }));
                }

                if(data.type === 'message') {
                    //save new msg to db
                    const newMsg= new Message({
                        username,
                        message: data.message,
                    });
                    
                    await newMsg.save();

                    //prepare msg to broadcast
                    const outgoing = JSON.stringify({
                        type:'message',
                        username,
                        message: data.message,
                        timestamp: newMsg.timestamp,
                    });

                    //send to all connected clients
                    wss.clients.forEach((client) => {
                        if(client.readyState === WebSocket.OPEN) {
                            client.send(outgoing);
                        }
                    });
                }
            } catch (err) {
                console.log("Websocket error: ",err.message);
            }
        });

        ws.on('close', ()=>{
            console.log(`${username} disconnected`);
        });
    });

    console.log('WebSocket server ready');
}

module.exports = setupWebSocket;