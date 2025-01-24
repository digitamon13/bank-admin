import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";


export const AdminUsersComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [userList, setUserList] = useState([])
    let [filteredUsers, setfilteredUsers] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)

    useEffect(() => {
        fetchAllUsers()
    }, [])




    let fetchAllUsers = async () => {
        setIsError(false)
        let res = await dispatch(fetchUsers())

        console.log(res)

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setUserList(res.message)
        setfilteredUsers(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/users/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server

        setIsError(false)
        let res = await dispatch(deleteUser(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = userList.filter(data => data._id !== id)
        setUserList(filteredArray)
        setfilteredUsers(filteredArray)
        setIsLoading(false)

    }





    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredUsers.filter((item) => {
                const itemData = item.email ? item.email : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })
            setUserList(newData)
            setIsLoading(false)
        } else {
            setUserList(filteredUsers)
            setIsLoading(false)
        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background, padding: '20px', fontFamily: 'Arial, sans-serif' }}>

    <div className={styles.timeline} style={{ backgroundColor: color.background, padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        
        <div className={styles.filter}>
            <div className={styles.searchContainer} style={{ marginBottom: '20px' }}>
                <div className={styles.searchBar} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', padding: '5px', borderRadius: '5px' }}>
                    <input
                        className={styles.input}
                        placeholder="Search by email"
                        onChange={searchHandler}
                        style={{
                            flex: 1,
                            padding: '8px',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            outline: 'none',
                            
                        }}
                       
                    />
                    <span className="material-icons" style={{ marginLeft: '10px', cursor: 'pointer', color: '#382b7d' }}>search</span>
                </div>
            </div>
        </div>

        <div className={styles.tableContainer} style={{ overflowX: 'auto' }}>
            {userList.length === 0 && (
                <div className={styles.emptyContainer} style={{ textAlign: 'center', padding: '20px' }}>
                    <p style={{ color: '#888' }}>No registered users</p>
                </div>
            )}

            {userList.length !== 0 && (
                <table
                    style={{
                        borderCollapse: 'collapse',
                        margin: '20px 0',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <thead>
                        <tr
                            style={{
                               
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                color: '#333',
                                backgroundColor:'transparent'
                            }}
                        >
                            <th style={{ padding: '12px 15px', width: '20%', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '12px 15px', width: '20%', textAlign: 'left' }}>First Name</th>
                            <th style={{ padding: '12px 15px', width: '20%', textAlign: 'left' }}>Phone Number</th>
                            <th style={{ padding: '12px 15px', width: '20%', textAlign: 'left' }}>Country</th>
                            <th style={{ padding: '12px 15px', width: '10%', textAlign: 'center' }}>Delete</th>
                            <th style={{ padding: '12px 15px', width: '10%', textAlign: 'center' }}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((data) => (
                            <tr
                                key={data.__id}
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    fontSize: '14px',
                                    color: '#555',
                                    backgroundColor:'transparent',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    flex:1
                                }}
                              
                            >
                                <td
                                    style={{
                                        padding: '12px 15px',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        textAlign: 'left',
                                        width: '20%'
                                    }}
                                >
                                    {data.email}
                                </td>
                                <td
                                    style={{
                                        padding: '12px 15px',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        textAlign: 'left',
                                        width: '20%'
                                    }}
                                >
                                    {data.firstName}
                                </td>
                                <td
                                    style={{
                                        padding: '12px 15px',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        textAlign: 'left',
                                        width: '20%'
                                    }}
                                >
                                    {data.phone}
                                </td>
                                <td
                                    style={{
                                        padding: '12px 15px',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        textAlign: 'left',
                                        width: '10%'
                                    }}
                                >
                                    {data.nationality}
                                </td>
                                <td
                                    onClick={() => deleteHandler(data._id)}
                                    style={{
                                        cursor: 'pointer',
                                        color: 'red',
                                        textAlign: 'center',
                                        padding: '12px 15px',
                                        width: '10%'
                                    }}
                                >
                                    <span className="material-icons">delete</span>
                                </td>
                                <td
                                    onClick={() => editHandler(data._id)}
                                    style={{
                                        cursor: 'pointer',
                                        color: 'blue',
                                        textAlign: 'center',
                                        padding: '12px 15px',
                                        width: '10%'
                                    }}
                                >
                                    <span className="material-icons">edit</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
</div>

    )




}
