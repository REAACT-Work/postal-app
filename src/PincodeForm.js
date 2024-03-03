import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PincodeForm.css'

function PincodeForm() {
  const [inputPincode, setInputPincode] = useState('');

  const handleInputChange = (e) => {
    setInputPincode(e.target.value);
  };

  return (
    <div>
      <h1>Enter Pincode</h1>
      <form>
        <input
          type="text"
          placeholder="Pincode"
          value={inputPincode}
          onChange={handleInputChange}
        />
        <Link to={`/pincode-details/${inputPincode}`}>
          <button disabled={inputPincode.length !== 6}>Lookup</button>
        </Link>
      </form>
    </div>
  );
}

export default PincodeForm;
