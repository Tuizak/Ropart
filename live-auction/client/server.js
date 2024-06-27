const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

let auctions = [
  { id: 1, item: 'Painting', highestBid: 100, highestBidder: null },
  { id: 2, item: 'Vintage Car', highestBid: 5000, highestBidder: null },
];

server.on('connection', (ws) => {
  console.log('Client connected');

  // Enviar la lista de subastas cuando un nuevo cliente se conecta
  ws.send(JSON.stringify({ type: 'INIT', auctions }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'BID') {
      const auction = auctions.find(a => a.id === data.auctionId);
      if (auction) {
        auction.highestBid = data.amount;
        auction.highestBidder = data.bidder;

        // Enviar la actualización a todos los clientes conectados
        server.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'UPDATE', auction }));
          }
        });
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
