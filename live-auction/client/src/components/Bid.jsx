import React, { useState } from 'react';

function Bid({ auctionId, highestBid, onBid }) {
  const [bidAmount, setBidAmount] = useState(highestBid + 10);
  const [bidder, setBidder] = useState('');

  const handleBid = () => {
    onBid(auctionId, bidAmount, bidder);
  };

  return (
    <div>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(Number(e.target.value))}
        min={highestBid + 1}
      />
      <input
        type="text"
        placeholder="Your Name"
        value={bidder}
        onChange={(e) => setBidder(e.target.value)}
      />
      <button onClick={handleBid}>Place Bid</button>
    </div>
  );
}

export default Bid;
