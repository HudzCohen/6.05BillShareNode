import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddParticipantPage = () => {
  
 const navigate = useNavigate();
const [name, setName] = useState('');
const [email, setEmail] = useState('')

const onSubmitClick = async () => {
  await axios.post('/api/participants/add', {name, email});
  navigate('/');
}

 return (
    <div className="container" style={{marginTop: 80}}>
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight: "80vh"}}>
            <div className="card shadow p-4" style={{width: '100%', maxWidth: 600, backgroundColor:'rgb(248, 249, 250)'}}>
                <h2 className="card-title text-center mb-4">Add Participant</h2>
                <div className="mb-3">
                    <label htmlFor="participantName" className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Enter participant name"
                      value={name} onChange={e => setName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="participantEmail" className="form-label">Email (optional)</label>
                    <input type="email" className="form-control" placeholder="Enter participant email"
                    value={email}  onChange={e => setEmail(e.target.value)}></input>
                </div>
                <button className="btn btn-primary w-100" onClick={onSubmitClick}>Add Participant</button>
            </div>
        </div>
    </div>
 )
}

export default AddParticipantPage;