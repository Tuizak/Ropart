import React, { useState, useEffect, useRef } from 'react';
import Bid from './Bid';

function Auction() {
  const [auctions, setAuctions] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'INIT') {
        setAuctions(data.auctions);
      } else if (data.type === 'UPDATE') {
        setAuctions((prevAuctions) =>
          prevAuctions.map((auction) =>
            auction.id === data.auction.id ? data.auction : auction
          )
        );
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleBid = (auctionId, amount, bidder) => {
    ws.current.send(JSON.stringify({ type: 'BID', auctionId, amount, bidder }));
  };

  return (
    <div>
      <h1>Live Auctions</h1>
      {auctions.map((auction) => (
        <div key={auction.id}>
          <h2>{auction.item}</h2>
          <p>Highest Bid: ${auction.highestBid}</p>
          <p>Highest Bidder: {auction.highestBidder || 'None'}</p>
          <Bid auctionId={auction.id} highestBid={auction.highestBid} onBid={handleBid} />
        </div>
      ))}
    </div>
  );
}

export default Auction;
