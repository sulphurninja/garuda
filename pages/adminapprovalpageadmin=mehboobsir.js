// pages/admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; // You need to create a Layout component
import ApprovalCard from '../components/ApprovalCard'; // You need to create this component

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);


  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('/api/pending-requests'); // Create this API route
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const handleApproval = async (userId, isApproved) => {
    try {
      await axios.put(`/api/approve/${userId}`, { approved: isApproved }); // Create this API route
      fetchPendingRequests();
    } catch (error) {
      console.error('Error updating approval:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Admin Approval Page</h1>
        {pendingRequests.map((request) => (
          <ApprovalCard
            key={request._id}
            user={request}
            onApprove={() => handleApproval(request._id, true)}
            onReject={() => handleApproval(request._id, false)}
          />
        ))}
      </div>
    </Layout>
  );
}
