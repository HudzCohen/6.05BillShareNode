import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const ListBillPage = () => {

    const [bills, setBills] = useState([]);

    useEffect(() => {
        const loadBills = async () => {
            const {data} = await axios.get('/api/bills/get');
            setBills(data);
        }

        loadBills();
    }, []);

    const formatMoney = (amount) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });
        return formatter.format(amount);
    }

    return (
     <div className="container" style={{marginTop: 80}}>
        <h2>Bills List</h2>
        <table className="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Participants</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
        {bills.map(b => (
                <tr key={b.Id}>
                 <th scope="row">{b.Id}</th>
                 <td>{dayjs(b.Date).format("MMMM/D")}</td>
                 <td>{formatMoney(b.Amount)}</td>
                 <td>{b.ParticipantCount}</td>
                 <td>
                    <Link className="btn btn-primary btn-sm" to={`/billdetails/${b.Id}`}>View Details</Link>
                 </td>
                </tr>
            ))}
        </tbody>
        </table>
     </div>
    )
}

export default ListBillPage;