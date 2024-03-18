/* eslint-disable no-mixed-operators */
// import React from 'react'
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Content from "../../../Components/Dashboard/Content/Content"
import Loader from '../../../Utils/Loader'
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from 'lucide-react';
import FullDataTable from "../../../Components/ExtraComponents/Datatable/FullDataTable"
import { GET_ALL_CLIENTS, GO_TO_DASHBOARDS, UPDATE_USER_ACTIVE_STATUS } from '../../../ReduxStore/Slice/Admin/AdminSlice'
import { DELETE_USER_SERVICES } from '../../../ReduxStore/Slice/Subadmin/userSlice'
import { useDispatch, useSelector } from "react-redux";
import Modal from '../../../Components/ExtraComponents/Modal';
import { fDate, fDateTimeSuffix } from '../../../Utils/Date_formet';
import { maskEmail, maskNumber } from "../../../Utils/HideWIthStart";
import { Get_Sub_Admin_Permissions } from '../../../ReduxStore/Slice/Subadmin/Subadminslice';
import toast, { Toaster } from 'react-hot-toast';

import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";



const AllClients = () => {
    const navigate = useNavigate()
    const location = useLocation()


    const dispatch = useDispatch()
    const Role = JSON.parse(localStorage.getItem("user_details")).Role
    const user_ID = JSON.parse(localStorage.getItem("user_details")).user_id
    const Subadmin_permision = JSON.parse(localStorage.getItem('user_details')).Subadmin_permision

    const gotodashboard = JSON.parse(localStorage.getItem('user_details_goTo'))
    const isgotodashboard = JSON.parse(localStorage.getItem('gotodashboard'))


    const [first, setfirst] = useState('all')


    const [btncolor, setbtncolor] = useState(false)
    const [refresh, setrefresh] = useState(false)

    const [getPermissions, setGetPermissions] = useState([])




    const [getAllClients, setAllClients] = useState({
        loading: true,
        data: []
    });


    console.log("getAllClients :", getAllClients)

    // DELETE USET FUNCTION TO DELETE ALL SERVICES
    const Delete_user = async (id) => {
        var req1 = {
            id: id
        }
        if (window.confirm("Do you want to delete this User ?")) {
            await dispatch(DELETE_USER_SERVICES(req1)).unwrap()
                .then((response) => {
                    // console.log("response", response);
                    if (response.status) {
                        setrefresh(!refresh)
                    }
                })
        }


    }


    // GET ALL CLIENTS

    const data = async () => {
        var req1 = {
            Find_Role: isgotodashboard ? gotodashboard.Role : Role,
            user_ID: isgotodashboard ? gotodashboard.user_id : user_ID
        }
        await dispatch(GET_ALL_CLIENTS(req1)).unwrap()
            .then((response) => {
                if (response.status) {
                    setAllClients({
                        loading: false,
                        data: response.data
                    });
                } else {
                    setAllClients({
                        loading: false,
                        data: response.data
                    });
                }
            })
    }
    useEffect(() => {
        data()
    }, [])




    const data2 = async () => {
        await dispatch(Get_Sub_Admin_Permissions({ id: user_ID })).unwrap()
            .then((response) => {
                if (response.status) {
                    setGetPermissions(response.data[0])
                }
            })
    }
    useEffect(() => {
        data2()
    }, [])




    // GO TO DASHBOARD
    const goToDashboard = async (asyncid, email, row) => {

        if (row.AppLoginStatus == "0" && row.WebLoginStatus == "0") {
            return
        }

        let req = {
            Email: email,

        };
        await dispatch(GO_TO_DASHBOARDS(req)).unwrap()
            .then((response) => {
                if (response.status) {
                    localStorage.setItem("route", "/subadmin/clients");
                    localStorage.setItem("gotodashboard", JSON.stringify(true));
                    localStorage.setItem("user_details_goTo", JSON.stringify(response.data));
                    localStorage.setItem("user_role_goTo", JSON.stringify(response.data.Role));
                    navigate("/client/dashboard")

                }
            })

    }

    // ACTIVE USER TO API
    const activeUser = async (e, data) => {
        let req = {
            id: data._id,
            user_active_status: e.target.checked === true ? "1" : "0"

        };

        if (window.confirm("Do you want To Change Status For This User ?")) {
            await dispatch(UPDATE_USER_ACTIVE_STATUS(req))
                .unwrap()
                .then((response) => {
                    if (response.status) {
                        // console.log("response", response)
                        toast.success(response.msg);
                        setTimeout(() => {
                            setrefresh(!refresh)
                        }, 500);
                    } else {
                        toast.error(response.msg);
                    }
                });
        }
        else {
            setrefresh(!refresh)

        }

    }



    const showBrokerName = (value1, licence_type) => {
        let value = parseInt(value1)


        if (licence_type === '0') {
            return "2 Days Only"
        }
        else if (licence_type === '1') {
            return "Demo"
        } else {
            if (value === 1) {
                return "markethub"
            }
            if (value === 1) {
                return "markethub"
            }
            else if (value === 2) {
                return "alice blue"
            }
            else if (value === 3) {
                return "master trust"
            }
            else if (value === 4) {
                return "Motilal Oswal"
            }
            else if (value === 5) {
                return "Zebull"
            }
            else if (value === 6) {
                return "IIFl"
            }
            else if (value === 7) {
                return "Kotak"
            }
            else if (value === 8) {
                return "Mandot"
            }
            else if (value === 9) {
                return "Choice"
            }
            else if (value === 10) {
                return "Anand Rathi"
            }
            else if (value === 11) {
                return "B2C"
            }
            else if (value === 12) {
                return "Angel"
            }
            else if (value === 13) {
                return "Fyers"
            }
            else if (value === 14) {
                return "5-Paisa"
            }
            else if (value === 15) {
                return "Zerodha"
            }
        }

    }


    const columns = [
        {
            dataField: "index",
            text: "SR. No.",
            formatter: (cell, row, rowIndex) => rowIndex + 1,
        },
        {
            dataField: 'UserName',
            text: 'User Name',
        },
        {
            dataField: 'Email',
            text: 'Email',
            formatter: (cell, row, rowIndex) => <>
                <span>
                    {getPermissions && getPermissions.detailsinfo === 1 ? cell : maskEmail(cell)}
                </span>
            </>
        },
        {
            dataField: 'PhoneNo',
            text: 'Phone Number',
            formatter: (cell, row, rowIndex) => <>
                <span>
                    {getPermissions && getPermissions.detailsinfo === 1 ? cell : maskNumber(cell)}
                </span>
            </>
        },
        {
            dataField: "client_key",
            text: "Client Key",
          },
        {
            dataField: 'broker',
            text: 'Broker',
            formatter: (cell, row) => showBrokerName(cell, row.license_type)
        },
        {
            dataField: 'ActiveStatus',
            text: 'Status',
            hidden: (isgotodashboard ? true : false),

            formatter: (cell, row) => (row.Is_Active === "1" ?
                <>

                    <label class="toggle mt-3">
                        <input class="toggle-checkbox bg-primary" type="checkbox"
                            checked={row.ActiveStatus === "1" ? true : false}
                            onChange={(e) => {
                                activeUser(e, row)
                            }}
                        />
                        <div class={`toggle-switch ${row.ActiveStatus === "1" ? 'bg-success' : 'bg-danger'}`}></div>
                    </label>

                </> : ""
            ),
        },

        {
            dataField: 'ActiveStatus',
            text: 'Got To Dashboard',
            hidden: (getPermissions && getPermissions.go_To_Dashboard == 1 ? false : true),
            formatter: (cell, row) => (
                <>
                    <span
                        className=" btn "
                        style={
                            row.AppLoginStatus == '0' && row.WebLoginStatus == '0'
                                ? { color: "#FF0000" }
                                : { color: "#008000" }
                        }
                        onClick={() => goToDashboard(row._id, row.Email, row)}
                        disabled={row.AppLoginStatus == "0" && row.WebLoginStatus == "0"}
                    >
                        Dashboard

                    </span>
                </>


            ),
        },
        {
            dataField: 'TradingStatus',
            text: 'TradingStatus',
            formatter: (cell, row) => (
                <>
                    <span style={(cell == "off" || cell === null) ? { color: "#FF0000", fontSize: "40px" } : { color: "#008000", fontSize: "40px" }}>&#9679;</span>
                </>
            ),
        },
        {
            dataField: 'StartDate',
            text: 'Start Date',
            formatter: (cell, row) => row.StartDate == null ? "----" : fDateTimeSuffix(row.StartDate)
        },
        {
            dataField: 'EndDate',
            text: 'End Date',
            formatter: (cell, row) => row.EndDate == null ? "----" : fDateTimeSuffix(row.EndDate)
        },

        {
            dataField: 'actions',
            text: 'Actions',
            hidden: (isgotodashboard ? true : false),

            formatter: (cell, row) => (
                <div style={{ width: "120px" }}>
                    <div>
                        {(getPermissions && getPermissions.client_edit === 1) || (getPermissions && getPermissions.Update_Api_Key === 1 && row.license_type !== "1" && row.Is_Active === "1") ? <>
                            <Link to={`/subadmin/client/edit/${row._id}`} state={row}>
                                <span data-toggle="tooltip" data-placement="top" title="Edit">
                                    <Pencil size={20} color="#198754" strokeWidth={2} className="mx-1" />
                                </span>
                            </Link>
                            {row.license_type !== "2"  && (getPermissions && getPermissions.Update_Api_Key === 0) ? <>
                                <Link>
                                    <span data-toggle="tooltip" data-placement="top" title="Delete">
                                        <Trash2 size={20} color="#d83131" strokeWidth={2} className="mx-1" onClick={(e) => Delete_user(row._id)} />
                                    </span>
                                </Link>
                            </> : ""}
                        </> : ""}
                    </div>
                </div>
            ),
        },

    ];

    // console.log("getPermissions && getPermissions.Update_Api_Key" ,getPermissions && getPermissions.Update_Api_Key)

    return (
        <>
            {
                getAllClients.loading ? <Loader /> :
                    <>
                        <Content Page_title="All Clients" button_title="Add Client" route='/subadmin/client/add' button_status={getPermissions && getPermissions.client_add == 1 ? true : false} >
                            {
                                getAllClients.data && getAllClients.data.length === 0 ?
                                    <>
                                        <FullDataTable TableColumns={columns} tableData={getAllClients.data} />
                                    </> :
                                    <>
                                        <FullDataTable TableColumns={columns} tableData={getAllClients.data} />
                                    </>
                            }

                        </Content>
                        <ToastButton />

                    </>
            }


        </ >
    )
}


export default AllClients

