// pages/admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; // You need to create a Layout component
import ApprovalCard from '../components/ApprovalCard'; // You need to create this component

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    async function checkApproval() {
      try {
        // Read the stored username from the cookie
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const usernameCookie = cookies.find(cookie => cookie.startsWith('username='));
        const storedUsername = usernameCookie ? usernameCookie.split('=')[1] : null;

        if (storedUsername) {
          // Make an API call to check the user's approval status
          const response = await fetch(`/api/check-admin?username=${storedUsername}`);
          const data = await response.json();
          if (response.ok) {
            setIsApproved(data.role);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking approval status:', error);
        setIsLoading(false);
      }
    }
    checkApproval();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Add loading indicator
  }

  if (!isApproved) {
    // another warning if not approved
    return <p className='text-red-400 text-center mt-32 text-4xl font-bold font-mono'>Not an Approved ADMIN!</p>; // Add loading indicator
    return null; // Return null to prevent rendering content
  }

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
