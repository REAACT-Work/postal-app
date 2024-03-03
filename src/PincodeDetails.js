import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PincodeDetails() {
  const { pincode } = useParams();
  const [pincodeData, setPincodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPincodeDetails = async () => {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        if (data[0].Status === 'Success') {
          setPincodeData(data[0].PostOffice);
        } else {
          setPincodeData([]);
        }
      } catch (error) {
        console.error('Error fetching pincode details:', error);
      }
      setLoading(false);
    };

    if (pincode) {
      fetchPincodeDetails();
    }

  }, [pincode]);

  const filteredData = pincodeData ? pincodeData.filter(office =>
    office.Name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>Pincode: {pincode}</h2>
      <p><b>Message:</b> {pincodeData ? pincodeData.length : 0} pincode found :</p>
      <input
        type="text"
        placeholder=" 🔍 Filter"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length > 0 ? (
        <div className='results'>
          {filteredData.map((office, index) => (
            <div key={index}  className="carda ">
              <p><strong>Name:</strong> {office.Name}</p>
              <p><strong>Branch Type:</strong> {office.BranchType}</p>
              <p><strong>Delivery Status:</strong> {office.DeliveryStatus}</p>
              <p><strong>District:</strong> {office.District}</p>
              <p><strong>State:</strong> {office.State}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available for this pincode</p>
      )}
    </div>
  );
}

export default PincodeDetails;
