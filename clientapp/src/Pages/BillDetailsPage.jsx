import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import dayjs from 'dayjs'


const BillDetailsPage = () => {

  const { Id } = useParams();
  const [billDetails, setBillDetails] = useState([]);

  useEffect(() => {
    const loadBillDetails = async () => {
      const { data } = await axios.get('/api/bills/getdetails', Id);
      setBillDetails(data);
      console.log({data});
    }

    loadBillDetails();
  }, []);

  const formatMoney = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
    return formatter.format(amount);
}

  if(!billDetails)
    {return (
      <h1>Loading...</h1>
    )}

  return (
    <div className="container" style={{ marginTop: 80 }}>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-lg" style={{ width: '100%', maxWidth: 600 }}>
          <div className="card-header bg-dark text-white">
            <h2 className="card-title text-center mb-0">Bill Details</h2>
          </div>
          <div className="card-body">
            <p>
              <strong>Date:</strong> {dayjs(billDetails[0].Date).format("MMMM/D")}
            </p>
            <p>
              <strong>Total Amount:</strong> {formatMoney(billDetails[0].Amount)}
            </p>
            <h3 className="mt-4">Participants</h3>
            <ul className="list-group">
              {billDetails.map(b => (
                <li key={b.Name} className="list-group-item d-flex justify-content-between align-items-center">
                  <span><FaUser className='me-2'/>{b.Name}</span>
                  <span className="badge bg-success rounded-pill">{b.Amount / billDetails.length}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillDetailsPage;
//
//