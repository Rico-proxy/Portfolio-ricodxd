import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import BaseLayout from './layout/BaseLayout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/*  BaseLayout */}
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Homepage />} />
          
        </Route>

        
      </Routes>
    </Router>
  );
};

export default App;
