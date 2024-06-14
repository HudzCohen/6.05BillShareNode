import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className='container mt-5' style={{marginTop: 80}}>
            <div className='jumbotron bg-light p-5 shadow-lg rounded'>
                <h1 className='display-4 text-center'>Welcome to BillShare!</h1>
                <p className='lead text-center mt-3'>
                    Easily split bills with friends and keep track of expenses.
                    Get started by adding participants, creating bills, and viewing the details.
                </p>
                <hr className='my-4'></hr>
                <div className='d-flex justify-content-center mt-4'>
                    <Link className='btn btn-primary mx-2' to={'/addparticipant'}>Add Participant</Link>
                    <Link className='btn btn-secondary mx-2' to={'/listparticipants'}>List Participants</Link>
                    <Link className='btn btn-success mx-2' to={'/addbill'}>Add Bill</Link>
                    <Link className='btn btn-info mx-2' to={'/listbills'}>List Bills</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;