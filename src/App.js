import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PincodeForm from './PincodeForm';
import PincodeDetails from './PincodeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PincodeForm />} />
        <Route path="/pincode-details/:pincode" element={<PincodeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
