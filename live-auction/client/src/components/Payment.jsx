import React from 'react';
import { useLocation } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const { auctionId, bidAmount } = location.state || { auctionId: 0, bidAmount: 0 };

  const handlePayment = () => {
    alert(`Payment of $${bidAmount} for auction ${auctionId} completed`);
  };

  return (
    <div>
      <h1>Payment</h1>
      <p>Auction ID: {auctionId}</p>
      <p>Bid Amount: ${bidAmount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Payment;
