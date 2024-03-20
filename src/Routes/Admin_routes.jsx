import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/Admin/System/System';




const Admin_Routing = () => {


    return (
        <>
            <MainHeader />
            <Header />

            <Routes>
                <Route exact path="/dashboard" element={<Overview />} />
                <Route exact path="/system" element={<System />} />

            </Routes>


        </>
    )
}

export default Admin_Routing
