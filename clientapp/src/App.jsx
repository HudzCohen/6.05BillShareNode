import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AddParticipantPage from './Pages/AddParticipantPage';
import ListParticipantsPage from './Pages/ListParticipantsPage';
import AddBillPage from "./Pages/AddBillPage";
import ListBillPage from "./Pages/ListBillPage";
import Layout from "./Components/Layout";
import BillDetailsPage from "./Pages/BillDetailsPage";

class App extends React.Component {
    render () {
        return (
            <Layout>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/addparticipant' element={<AddParticipantPage />} />
                    <Route path='/listparticipants' element={<ListParticipantsPage />} />
                    <Route path='/addbill' element={<AddBillPage />} />
                    <Route path='/listbills' element={<ListBillPage />} />
                    <Route path="/billdetails/:Id" element={<BillDetailsPage />} />
                </Routes>
            </Layout>
        );
    }
};

export default App;