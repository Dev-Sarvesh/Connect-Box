import React from 'react'
import { Route, Routes, NavLink, useLocation, useNavigate } from "react-router-dom";

import Wraper from '../Components/Dashboard/Wraper/Wraper';

import Dashboard from '../layout/User/Dashboard/Dashboard';
import Signals from '../layout/User/Signals/Signals';
import TradingStatus from '../layout/User/Trading status/Tradingstatus';
import Profile from '../layout/User/Profile/Profile';
import BrokerResponse from '../layout/User/BrokerResponse/BrokerResponse';
import TradeHistory from '../layout/User/TradeHistory/TradeHistory';
import ApiCreateInfo from '../layout/User/ApiCreateInfo/ApiCreateInfo';
import HelpCenter from '../layout/User/HelpCenter/HelpCenter';
import StrategyDesc from '../layout/User/StrategyDesc/StrategyDesc';
import UserProfile from '../layout/User/UserProfile/UserProfile';
import ApiCreateInfo1 from '../layout/User/UserProfile/UserProfile';
import UserProfileDemo from '../layout/User/UserProfile/UserProfile_demo';

 
// OPTION CHAIN
import Opation_Chain from '../layout/User/OptionChain/Opation_Chain';
import Open_Positions from '../layout/User/OptionChain/Open_Positions';
import PaymentPage from '../layout/User/Payment'


// strategydesc

const Admin = () => {

    const location = useLocation();
    const navigate = useNavigate()


    return (
        <>
            {location.pathname !== "/client" && location.pathname !== "/client/*" ? <Wraper /> : null}

            <Routes>
                {/* <> */}
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/userprofile" element={<UserProfile />} />
                <Route exact path="/payment" element={<PaymentPage />} />
                <Route exact path="/signals" element={<Signals />} />
                <Route exact path="/tradingstatus" element={<TradingStatus />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/brokerresponse" element={<BrokerResponse />} />
                <Route exact path="/tradehistory" element={<TradeHistory />} />
                <Route exact path="/apicreateinfo" element={<ApiCreateInfo />} />
                <Route exact path="/helpcenter" element={<HelpCenter />} />
                <Route exact path="/strategydesc" element={<StrategyDesc />} />
                <Route exact path="/optionchain" element={<Opation_Chain />} />
                <Route exact path="/openpostion" element={<Open_Positions />} />
                <Route exact path="/apicreateinfo" element={<ApiCreateInfo1 />} />
                <Route exact path="/demo" element={<UserProfileDemo />} />

            </Routes>


        </>
    )
}

export default Admin