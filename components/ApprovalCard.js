// components/ApprovalCard.js
import React from 'react';

const ApprovalCard = ({ user, onApprove, onReject }) => {
  return (
    <div className="bg-white p-4 shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
      <p className="mb-2">{user.email}</p>
      <div className="flex justify-end">
        <button
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
          onClick={onApprove}
        >
          Approve
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ApprovalCard;
