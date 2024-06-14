import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListParticipantPage = () => {

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
       const loadParticipants = async () => {
         const {data} = await axios.get('/api/participants/get');
         setParticipants(data);
       }
    
       loadParticipants();
    }, []);

    return (
       <div className="container" style={{marginTop: 80}}>
        <h2>Participants</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {participants.map(p => (
                    <tr key={p.Id}>
                        <th scope="row">{p.Id}</th>
                        <td>{p.Name}</td>
                        <td>{p.Email ? p.Email : 'No email available'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
       </div>
    )
}

export default ListParticipantPage;