import React from 'react';
import Navbar from '../common/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 FakeStore Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;