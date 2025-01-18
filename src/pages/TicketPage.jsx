import React from 'react';

const TicketCard = ({ fullName, email, image }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-card-header">
        <img src={image} alt="Profile" className="ticket-avatar" />
        <h2>{fullName}</h2>
      </div>
      <div className="ticket-card-body">
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default TicketCard;
