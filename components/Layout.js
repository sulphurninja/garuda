// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white p-4 shadow-md">
        <nav className="container mx-auto">
          <h1 className="text-2xl font-semibold">Garuda CDR - Admin Panel</h1>
        </nav>
      </header>
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
};

export default Layout;
