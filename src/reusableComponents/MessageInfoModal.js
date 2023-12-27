// InfoCard.jsx
import React from 'react';

const MessageInfoModal = ({ title, value,col}) => (
  <div className={`col-${col} mt-2`}>
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body p-2">
        <h5 className="card-title">
          <strong>{title} : </strong>
        </h5>
        <p className="card-text m-0">{value}</p>
      </div>
    </div>
  </div>
);

export default MessageInfoModal;
