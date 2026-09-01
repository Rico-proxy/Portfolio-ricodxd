// src/layouts/BaseLayout.tsx
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import ScrollToTopButton from '@/components/shared/ScrollToTopButton';
import React from 'react';
import { Outlet } from 'react-router-dom';


const BaseLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <>
      <Navbar/>
      </>
      <main className="flex-grow">
        <Outlet /> 
      </main>
     <>
     <Footer/>
     </>
     <ScrollToTopButton />
    </div>
  );
};

export default BaseLayout;
