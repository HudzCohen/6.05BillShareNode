import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBillPage = () => {

  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [participantsId, setParticipantsId] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const loadParticipants = async () => {
      const { data } = await axios.get('/api/participants/get');
      setParticipants(data);
    }

    loadParticipants();
  }, []);

  
  const onParticipantChange = async (Id) => {
     let p = participantsId.includes(Id) ? [...participantsId.filter(p => p !== Id)] : [...participantsId, Id];
     setParticipantsId(p);
  } 

  const onSubmitClick = async () => {
    await axios.post('/api/bills/add', {amount, participantsId });
    navigate('/listbills');
  }

  return (
    <div className="container" style={{ marginTop: 80 }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: 600 }}>
          <h2 className="card-title text-center mb-4">Add Bill</h2>
          <div className="mb-3">
            <label htmlFor="totalAmount" className="form-label">Total Amount</label>
            <input type="number" className="form-control" id="totalAmount" placeholder="Enter total bill amount" 
            min={0} value={amount} onChange={e => setAmount(e.target.value)}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="participants" className="form-label">Select Participants</label>
            <div>
              {participants.map(p => {
                return (
                <div key={p.Id} className="form-check">
                  <input className="form-check-input" type="checkbox" value={p.Id} onChange={() => onParticipantChange(p.Id)}></input>
                  <label className="form-check-label">{p.Name}</label>
                </div>)
              })}
            </div>
          </div>
          <button className="btn btn-primary w-100 mt-4" onClick={onSubmitClick}>Submit Bill</button>
        </div>
      </div>
    </div>
  )
}

export default AddBillPage;